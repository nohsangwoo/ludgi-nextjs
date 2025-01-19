import type { Context } from '../type'
import { UpdateUserMutationVariables } from '../../generated/graphql'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

/**
 * Zod를 사용한 사용자 업데이트 입력값 검증 스키마
 * - 실시간으로 데이터 유효성을 검증하고 타입 안전성을 보장
 * - 각 필드마다 구체적인 에러 메시지를 정의하여 사용자 경험 향상
 */
const updateUserSchema = z.object({
  email: z
    .string()
    .email('유효한 이메일 형식이 아닙니다')
    .min(1, '이메일은 필수입니다'),
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(100, '이름이 너무 깁니다')
    .nullable(),
})

const resolvers = {
  Mutation: {
    updateUser: async (
      _parent: unknown,
      args: UpdateUserMutationVariables,
      context: Context,
    ) => {
      try {
        /**
         * 1단계: 입력값 검증
         * - safeParse: 유효성 검사 실행 (에러를 throw하지 않고 결과 객체 반환)
         * - success: 검증 성공 여부
         * - error: 검증 실패 시 에러 정보
         * - data: 검증 성공 시 정제된 데이터
         */
        const validationResult = updateUserSchema.safeParse(args)

        if (!validationResult.success) {
          return {
            ok: false,
            error: validationResult.error.errors[0].message,
            user: null,
          }
        }

        /**
         * 2단계: 사용자 존재 여부 확인
         * - 업데이트 전 대상 사용자가 실제로 존재하는지 확인
         * - findUnique: 고유 식별자로 단일 레코드 조회
         * - 존재하지 않는 경우 early return으로 불필요한 처리 방지
         */
        const existingUser = await context.client.user.findUnique({
          where: { email: args.email },
        })

        if (!existingUser) {
          return {
            ok: false,
            error: '수정할 사용자를 찾을 수 없습니다.',
            user: null,
          }
        }

        /**
         * 3단계: 변경사항 확인
         * - 불필요한 데이터베이스 작업 방지
         * - 실제 변경사항이 있는 경우에만 업데이트 수행
         * - 변경사항이 없는 경우 기존 데이터 반환
         */
        if (existingUser.name === args.name) {
          return {
            ok: true,
            error: null,
            user: existingUser,
          }
        }

        /**
         * 4단계: 트랜잭션을 통한 안전한 업데이트
         * - 여러 테이블의 데이터를 동시에 수정할 때 데이터 일관성 보장
         * - 하나라도 실패하면 모든 변경사항이 롤백됨
         * - 동시성 문제 해결
         */
        const user = await context.client.$transaction(async tx => {
          /**
           * 4-1: 사용자 정보 업데이트
           * - update: 기존 레코드 수정
           * - include: 연관 데이터 함께 조회 (N+1 문제 방지)
           * - select: 필요한 필드만 선택적으로 조회 (성능 최적화)
           */
          const updatedUser = await tx.user.update({
            where: { email: args.email },
            data: {
              name: args.name,
            },
            include: {
              profile: true,
              posts: {
                select: {
                  id: true,
                  title: true,
                  createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
                take: 5, // 최근 5개 포스트만 조회 (성능 최적화)
              },
            },
          })

          /**
           * 4-2: 연관 데이터 업데이트
           * - 프로필 정보가 있는 경우 함께 업데이트
           * - 트랜잭션 내에서 처리하여 데이터 일관성 보장
           * - 실제 업데이트가 필요한 필드만 포함
           */
          if (updatedUser.profile) {
            await tx.profile.update({
              where: { userId: updatedUser.id },
              data: {
                // 프로필 관련 업데이트가 필요한경우 필드만 추가
              },
            })
          }

          return updatedUser
        })

        /**
         * 5단계: 성공 응답 반환
         * - ok: 작업 성공 여부
         * - error: 에러 메시지 (성공 시 null)
         * - user: 업데이트된 사용자 정보
         */
        return {
          ok: true,
          error: null,
          user,
        }
      } catch (error) {
        /**
         * 6단계: 에러 처리
         * - 발생한 모든 에러를 로깅하여 디버깅 용이
         * - Prisma 에러 코드별 적절한 에러 메시지 반환
         * - 사용자에게 친숙한 에러 메시지 제공
         */
        console.error('updateUser 에러:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // P2002: 고유 제약 조건 위반 (unique 필드 중복)
          if (error.code === 'P2002') {
            return {
              ok: false,
              error: '중복된 데이터가 존재합니다.',
              user: null,
            }
          }
          // P2025: 레코드를 찾을 수 없음
          if (error.code === 'P2025') {
            return {
              ok: false,
              error: '사용자를 찾을 수 없습니다.',
              user: null,
            }
          }
        }

        // 기타 예상치 못한 에러
        return {
          ok: false,
          error: '사용자 정보 수정 중 오류가 발생했습니다.',
          user: null,
        }
      }
    },
  },
}

export default resolvers
