'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '@/generated/graphql'
import { createUser } from '@/graphql/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'

const schema = z
  .object({
    email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
    name: z.string().optional(),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' })
      .regex(/[0-9]/, { message: '숫자를 포함해야 합니다' })
      .regex(/[a-z]/, { message: '영문 소문자를 포함해야 합니다' })
      .regex(/[A-Z]/, { message: '영문 대문자를 포함해야 합니다' })
      .regex(/[^A-Za-z0-9]/, { message: '특수문자를 포함해야 합니다' }),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

type FormValues = z.infer<typeof schema>;

export default function CreateExample() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation<
    CreateUserMutation,
    ApolloError,
    CreateUserMutationVariables
  >({
    mutationFn: params => createUser(params),
    onSuccess: (data, variables, context) => {
      if (data.createUser.ok) {
        alert('성공적으로 생성되었습니다!')

        /**
         * 1. invalidateQueries
         * - 캐시를 'stale'(오래된) 상태로 표시
         * - 실제 리페치는 다음 조건에서 발생:
         *   a) 해당 쿼리를 사용하는 컴포넌트가 마운트되어 있을 때
         *   b) 윈도우가 다시 포커스될 때
         *   c) 네트워크가 다시 연결될 때
         * - 더 효율적인 캐시 관리 방식
         * - 불필요한 네트워크 요청을 방지
         */
        queryClient.invalidateQueries({ queryKey: ['getUsersWithPosts'] })

        /**
         * 2. refetchQueries
         * - 즉시 새로운 네트워크 요청을 강제로 실행
         * - 컴포넌트의 마운트 여부와 관계없이 실행
         * - 캐시 상태와 관계없이 항상 새로운 데이터를 가져옴
         * - 사용 사례:
         *   a) 즉각적인 데이터 동기화가 필요할 때
         *   b) 실시간성이 매우 중요한 경우
         *
         * 참고: 일반적으로는 invalidateQueries만으로 충분하며,
         * 여기서는 학습을 위해 두 가지 방식을 모두 보여주는 예시입니다.
         */
        // queryClient.refetchQueries({ queryKey: ['getUsersWithPosts'] })

        console.log('data: ', data)
        console.log('variables: ', variables)
        console.log('context: ', context)
      } else {
        alert(data.createUser.error)
      }
    },
    onError: error => {
      console.log('오류가 발생했습니다: ' + error.message)
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log('check data in onSubmit: ', data)
    mutate(data)
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        사용자 생성
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            {...register('email', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            type="text"
            {...register('name', { required: false })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호 확인
          </label>
          <input
            type="password"
            {...register('passwordConfirm', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-500 mt-1">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isPending ? '처리중...' : '생성하기'}
        </button>
      </form>
    </div>
  )
}
