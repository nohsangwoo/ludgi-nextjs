'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  UpdateUserForOptimisticUpdateMutation,
  UpdateUserForOptimisticUpdateMutationVariables,
} from '@/generated/graphql'
import {
  getUsersWithPosts,
  updateUserForOptimisticUpdate,
} from '@/graphql/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'

const schema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(100, '이름이 너무 깁니다')
    .nullable(),
})

type FormValues = z.infer<typeof schema>

interface UsersData {
  users: {
    email: string
    name: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any // 다른 필드들을 위한 인덱스 시그니처
  }[]
}

export default function TanstackQueryOptimisticUpdate() {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['getUsersWithPosts'],
    queryFn: () => getUsersWithPosts(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation<
    UpdateUserForOptimisticUpdateMutation,
    ApolloError,
    UpdateUserForOptimisticUpdateMutationVariables
  >({
    mutationFn: params => updateUserForOptimisticUpdate(params),
    onMutate: async newUserData => {
      await queryClient.cancelQueries({ queryKey: ['getUsersWithPosts'] })
      const previousData = queryClient.getQueryData<UsersData>([
        'getUsersWithPosts',
      ])

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['getUsersWithPosts'], (old: any) => ({
        getUsersWithPosts: {
          ...old.getUsersWithPosts,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          users: old.getUsersWithPosts.users.map((user: any) =>
            user.email === newUserData.email
              ? { ...user, name: newUserData.name }
              : user,
          ),
        },
      }))

      return { previousData }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newData, context: any) => {
      queryClient.setQueryData(['getUsersWithPosts'], context.previousData)
      alert('업데이트 중 오류가 발생했습니다: ' + err.message)
    },
    onSuccess: data => {
      if (data.updateUserForOptimisticUpdate.ok) {
        alert('성공적으로 수정되었습니다!')
        reset()
      } else {
        alert(data.updateUserForOptimisticUpdate.error)
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        에러가 발생했습니다: {error.message}
      </div>
    )
  }

  const onSubmit = (formData: FormValues) => {
    mutate(formData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          낙관적 업데이트 예제
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
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
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
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

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">현재 사용자 목록</h3>
        <div className="grid gap-4">
          {data?.getUsersWithPosts.users.map(user => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="grid grid-cols-[100px_1fr] gap-4">
                <div className="text-gray-600 font-medium">ID</div>
                <div>{user.id}</div>

                <div className="text-gray-600 font-medium">이메일</div>
                <div className="text-blue-600">{user.email}</div>

                <div className="text-gray-600 font-medium">이름</div>
                <div>{user.name || '미지정'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
