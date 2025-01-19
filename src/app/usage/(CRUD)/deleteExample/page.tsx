'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from '@/generated/graphql'
import { deleteUser } from '@/graphql/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'

const schema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
})

type FormValues = z.infer<typeof schema>

export default function DeleteExample() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation<
    DeleteUserMutation,
    ApolloError,
    DeleteUserMutationVariables
  >({
    mutationFn: params => deleteUser(params),
    onSuccess: data => {
      if (data.deleteUser.ok) {
        alert('성공적으로 삭제되었습니다!')
        // 캐시 무효화
        // queryClient.invalidateQueries({ queryKey: ['getUsersWithPosts'] })
        // 캐시 무효화 대신 refetchQueries 사용
        queryClient.refetchQueries({ queryKey: ['getUsersWithPosts'] })
        // 폼 초기화
        reset()
      } else {
        alert(data.deleteUser.error)
      }
    },
    onError: error => {
      console.error('삭제 중 오류가 발생했습니다:', error)
      alert('삭제 중 오류가 발생했습니다.')
    },
  })

  const onSubmit = (data: FormValues) => {
    // 삭제 확인
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      console.log('삭제할 사용자:', data)
      mutate(data)
    }
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        사용자 삭제
      </h2>
      <div className="mb-4 p-4 bg-red-50 rounded-md">
        <p className="text-sm text-red-600">
          ⚠️ 주의: 사용자 삭제 시 관련된 모든 데이터(프로필, 게시물 등)가 함께
          삭제됩니다.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            삭제할 사용자 이메일
          </label>
          <input
            type="text"
            {...register('email')}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="삭제할 사용자의 이메일을 입력하세요"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400"
        >
          {isPending ? '삭제 중...' : '삭제하기'}
        </button>
      </form>
    </div>
  )
}
