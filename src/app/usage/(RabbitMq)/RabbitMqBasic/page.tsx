'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  CreateQueueMessageForRabbitMqMutation,
  CreateQueueMessageForRabbitMqMutationVariables,
} from '@/generated/graphql'
import { createQueueMessageForRabbitMq } from '@/graphql/apis'
import { useMutation } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'

const schema = z.object({
  queue: z.string().min(1, { message: '큐 이름을 입력해주세요' }),
  content: z.string().min(1, { message: '메시지 내용을 입력해주세요' }),
})

type FormValues = z.infer<typeof schema>

export default function RabbitMqBasic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation<
    CreateQueueMessageForRabbitMqMutation,
    ApolloError,
    CreateQueueMessageForRabbitMqMutationVariables
  >({
    mutationFn: params => createQueueMessageForRabbitMq(params),
    onSuccess: data => {
      if (data.createQueueMessageForRabbitMq.ok) {
        alert(data.createQueueMessageForRabbitMq.message)
        reset() // 폼 초기화
      } else {
        alert(data.createQueueMessageForRabbitMq.error)
      }
    },
    onError: error => {
      console.error('메시지 발행 중 오류 발생:', error.message)
      alert('메시지 발행 중 오류가 발생했습니다.')
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log('발행할 메시지:', data)
    mutate(data)
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        RabbitMQ 메시지 발행
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            큐 이름
          </label>
          <input
            type="text"
            {...register('queue')}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="메시지를 발행할 큐 이름"
          />
          {errors.queue && (
            <p className="text-sm text-red-500 mt-1">{errors.queue.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            메시지 내용
          </label>
          <textarea
            {...register('content')}
            className="w-full px-3 py-2 border rounded-md h-32"
            placeholder="발행할 메시지 내용을 입력하세요"
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isPending ? '발행 중...' : '메시지 발행'}
        </button>
      </form>
    </div>
  )
}
