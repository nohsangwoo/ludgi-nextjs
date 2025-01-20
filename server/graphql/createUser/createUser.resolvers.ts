import type { Context } from '../type'
import { CreateUserMutationVariables } from '../../generated/graphql'
import { Prisma } from '@prisma/client'
import { z } from 'zod'
import * as argon2 from 'argon2'
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'

/**
 * Zod 스키마 정의
 * - 비밀번호 정책 강화
 * - NIST 최신 가이드라인 반영
 */
const createUserSchema = z.object({
  email: z
    .string()
    .email('유효한 이메일 형식이 아닙니다')
    .min(1, '이메일은 필수입니다'),
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(100, '이름이 너무 깁니다'),
  password: z
    .string()
    .min(12, '비밀번호는 최소 12자 이상이어야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다')
    .regex(/[a-z]/, '영문 소문자를 포함해야 합니다')
    .regex(/[A-Z]/, '영문 대문자를 포함해야 합니다')
    .regex(/[^A-Za-z0-9]/, '특수문자를 포함해야 합니다'),
})

const resolvers = {
  Mutation: {
    createUser: async (
      _parent: unknown,
      args: CreateUserMutationVariables,
      context: Context,
    ) => {
      try {
        const validationResult = createUserSchema.safeParse(args)

        if (!validationResult.success) {
          return {
            ok: false,
            error: validationResult.error.errors[0].message,
            user: null,
          }
        }

        const exists = await context.client.user.findUnique({
          where: { email: args.email },
        })

        if (exists) {
          return {
            ok: false,
            error: '이미 존재하는 이메일입니다.',
            user: null,
          }
        }

        /**
         * Argon2를 사용한 비밀번호 해싱
         * - argon2id: 가장 안전한 변형
         * - memoryCost: 메모리 사용량 (64MB)
         * - timeCost: 반복 횟수
         * - parallelism: 병렬 처리 스레드 수
         */
        const hashedPassword = await argon2.hash(
          validationResult.data.password,
          {
            type: argon2.argon2id,
            memoryCost: 65536, // 64MB
            timeCost: 3,
            parallelism: 4,
          },
        )

        const user = await context.client.user.create({
          data: {
            ...validationResult.data,
            password: hashedPassword,
          },
        })

        console.log('user: ', user)

        const { password, ...userWithoutPassword } = user

        // 구독자들에게 새 사용자 생성 알림 예제
        context.pubsub.publish('USER_CREATED', {
          userCreated: userWithoutPassword,
        })

        return {
          ok: true,
          error: null,
          user: userWithoutPassword,
        }
      } catch (error) {
        console.error('createUser 에러:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            return {
              ok: false,
              error: '중복된 데이터가 존재합니다.',
              user: null,
            }
          }
        }

        return {
          ok: false,
          error: '사용자 생성 중 오류가 발생했습니다.',
          user: null,
        }
      }
    },
  },
}

export default resolvers
