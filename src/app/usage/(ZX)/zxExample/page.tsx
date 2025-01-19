'use client'

import { ZxTestMutation, ZxTestMutationVariables } from '@/generated/graphql'
import { zxTest } from '@/graphql/apis'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ApolloError } from '@apollo/client'

export default function ZxExample() {
  const [result, setResult] = useState<
    ZxTestMutation['zxTest']['result'] | null
  >(null)

  const { mutate, isPending } = useMutation<
    ZxTestMutation,
    ApolloError,
    ZxTestMutationVariables
  >({
    mutationFn: params => zxTest(params),
    onSuccess: data => {
      setResult(data.zxTest.result)
    },
    onError: error => {
      console.log('오류가 발생했습니다: ' + error.message)
    },
  })

  const onSubmit = () => {
    mutate({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ZX 테스트</h2>

        <div className="space-y-6">
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? '실행 중...' : '실행하기'}
          </button>

          {isPending && (
            <div className="text-center text-sm text-gray-500 flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>명령어 실행 중...</span>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">실행 결과</h3>

              <div className="space-y-3">
                {result.stdout && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      표준 출력:
                    </p>
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      {result.stdout}
                    </pre>
                  </div>
                )}

                {result.stderr && (
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-red-700 mb-1">
                      표준 에러:
                    </p>
                    <pre className="text-sm text-red-600 whitespace-pre-wrap">
                      {result.stderr}
                    </pre>
                  </div>
                )}

                {result.duration && (
                  <div className="text-sm text-gray-500">
                    실행 시간: {result.duration}ms
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
