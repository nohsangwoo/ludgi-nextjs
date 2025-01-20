import type { Context } from '../type'
import { Prisma } from '@prisma/client'
import { z } from 'zod'
import {
  DeleteUserMutationVariables,
  DeleteUserResult,
} from '../../generated/graphql'

/**
 * Zod를 사용한 사용자 삭제 입력값 검증 스키마
 * - 이메일 필드 유효성 검증
 * - 필수값 체크
 */
const deleteUserSchema = z.object({
  email: z
    .string()
    .email('유효한 이메일 형식이 아닙니다')
    .min(1, '이메일은 필수입니다'),
})

const resolvers = {
  Mutation: {
    deleteUser: async (
      _parent: unknown,
      args: DeleteUserMutationVariables,
      context: Context,
    ): Promise<DeleteUserResult> => {
      try {
        /**
         * 1단계: 입력값 검증
         * - 이메일 형식 및 필수값 검증
         */
        const validationResult = deleteUserSchema.safeParse(args)

        if (!validationResult.success) {
          return {
            ok: false,
            error: validationResult.error.errors[0].message,
            user: null,
          }
        }

        /**
         * 2단계: 사용자 존재 여부 확인
         * - 삭제 전 대상 사용자가 실제로 존재하는지 확인
         * - 존재하지 않는 경우 early return
         */
        const existingUser = await context.client.user.findUnique({
          where: { email: args.email },
          include: {
            profile: true,
            posts: true,
          },
        })

        if (!existingUser) {
          return {
            ok: false,
            error: '삭제할 사용자를 찾을 수 없습니다.',
            user: null,
          }
        }

        /**
         * 3단계: 트랜잭션을 통한 안전한 삭제
         * - 사용자와 연관된 모든 데이터를 트랜잭션으로 처리
         * - 삭제 순서 중요: 자식 테이블부터 삭제
         * - 모든 작업이 성공적으로 완료되어야 커밋
         */
        const deletedUser = await context.client.$transaction(async tx => {
          // 3-1: 사용자의 게시물 삭제
          if (existingUser.posts.length > 0) {
            await tx.post.deleteMany({
              where: { authorId: existingUser.id },
            })
          }

          // 3-2: 사용자의 프로필 삭제
          if (existingUser.profile) {
            await tx.profile.delete({
              where: { userId: existingUser.id },
            })
          }

          // 3-3: 사용자 삭제
          const user = await tx.user.delete({
            where: { email: args.email },
          })

          return user
        })

        /**
         * 4단계: 성공 응답 반환
         * - 삭제된 사용자 정보 포함
         */
        return {
          ok: true,
          error: null,
          user: deletedUser,
        }
      } catch (error) {
        /**
         * 5단계: 에러 처리
         * - 발생 가능한 Prisma 에러 처리
         * - 사용자 친화적인 에러 메시지 반환
         */
        console.error('deleteUser 에러:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // P2025: 레코드를 찾을 수 없음
          if (error.code === 'P2025') {
            return {
              ok: false,
              error: '사용자를 찾을 수 없습니다.',
              user: null,
            }
          }
          // P2003: 외래 키 제약 조건 위반
          if (error.code === 'P2003') {
            return {
              ok: false,
              error: '연관된 데이터로 인해 삭제할 수 없습니다.',
              user: null,
            }
          }
        }

        // 기타 예상치 못한 에러
        return {
          ok: false,
          error: '사용자 삭제 중 오류가 발생했습니다.',
          user: null,
        }
      }
    },
  },
}

export default resolvers
