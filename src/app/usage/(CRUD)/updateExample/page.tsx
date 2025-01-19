'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@/generated/graphql'
import { updateUser } from '@/graphql/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'

const schema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(100, '이름이 너무 깁니다')
    .nullable(),
})

type FormValues = z.infer<typeof schema>;

export default function UpdateExample() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation<
    UpdateUserMutation,
    ApolloError,
    UpdateUserMutationVariables
  >({
    mutationFn: params => updateUser(params),
    onSuccess: data => {
      if (data.updateUser.ok) {
        alert('성공적으로 수정되었습니다!')
        console.log('업데이트된 사용자 정보:', data.updateUser.user)
        // queryClient.invalidateQueries({ queryKey: ['getUsersWithPosts'] })
        queryClient.refetchQueries({ queryKey: ['getUsersWithPosts'] })
      } else {
        alert(data.updateUser.error)
      }
    },
    onError: error => {
      console.log('오류가 발생했습니다: ' + error.message)
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log('수정할 데이터:', data)
    mutate(data)
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        사용자 정보 수정
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (수정 기준)
          </label>
          <input
            type="text"
            {...register('email')}
            className="w-full px-3 py-2 border rounded-md bg-gray-50"
            placeholder="수정할 사용자의 이메일"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            새로운 이름
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="변경할 이름을 입력하세요"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isPending ? '수정 중...' : '수정하기'}
        </button>
      </form>
    </div>
  )
}
