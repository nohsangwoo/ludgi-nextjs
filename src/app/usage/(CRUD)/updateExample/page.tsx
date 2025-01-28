'use client' // Next.js에서 클라이언트 컴포넌트로 렌더링되도록 설정

import { useForm } from 'react-hook-form' // form 관리를 위한 라이브러리
import { zodResolver } from '@hookform/resolvers/zod' // react-hook-form과 zod를 연결하기 위한 resolver
import * as z from 'zod' // 입력 검증(validation)을 위한 라이브러리
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@/generated/graphql' // GraphQL에서 생성된 타입 정의
import { updateUser } from '@/graphql/apis' // 사용자 정보를 업데이트하는 API 함수
import { useMutation, useQueryClient } from '@tanstack/react-query' // React Query를 사용한 데이터 관리
import { ApolloError } from '@apollo/client' // GraphQL 요청 에러 처리 클래스

// 입력 폼 데이터의 검증 스키마 정의
const schema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }), // 이메일 필드는 유효한 형식이어야 함
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다') // 이름은 최소 2자 이상이어야 함
    .max(100, '이름이 너무 깁니다') // 이름은 최대 100자를 넘을 수 없음
    .nullable(), // 이름 필드는 비워둘 수도 있음
})

// 폼 데이터 타입 추론
type FormValues = z.infer<typeof schema>

// React 컴포넌트 정의
export default function UpdateExample() {
  const queryClient = useQueryClient() // React Query의 캐시와 상호작용을 위한 객체

  // useForm 훅을 사용하여 폼 관리
  const {
    register, // 폼 필드를 React Hook Form과 연결
    handleSubmit, // 폼 제출 핸들러
    formState: { errors }, // 폼의 에러 상태
  } = useForm<FormValues>({
    resolver: zodResolver(schema), // zod 스키마를 이용한 폼 데이터 검증
  })

  // 사용자 정보를 업데이트하는 mutation 설정
  const { mutate, isPending } = useMutation<
    UpdateUserMutation, // GraphQL mutation의 반환 타입
    ApolloError, // 에러 타입
    UpdateUserMutationVariables // mutation에 전달할 변수 타입
  >({
    mutationFn: params => updateUser(params), // mutation 함수
    onSuccess: data => {
      if (data.updateUser.ok) {
        alert('성공적으로 수정되었습니다!') // 성공 메시지 출력
        console.log('업데이트된 사용자 정보:', data.updateUser.user) // 콘솔에 업데이트된 사용자 정보 출력
        queryClient.refetchQueries({ queryKey: ['getUsersWithPosts'] }) // 관련된 쿼리를 리패치하여 최신화
      } else {
        alert(data.updateUser.error) // 서버에서 받은 에러 메시지 출력
      }
    },
    onError: error => {
      console.log('오류가 발생했습니다: ' + error.message) // 콘솔에 에러 메시지 출력
    },
  })

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: FormValues) => {
    console.log('수정할 데이터:', data) // 제출된 데이터를 콘솔에 출력
    mutate(data) // mutation 실행
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      {/* 제목 */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        사용자 정보 수정
      </h2>

      {/* 사용자 정보 수정 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          {/* 이메일 입력 필드 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (수정 기준)
          </label>
          <input
            type="text"
            {...register('email')} // React Hook Form과 연결
            className="w-full px-3 py-2 border rounded-md bg-gray-50"
            placeholder="수정할 사용자의 이메일" // 사용자에게 입력 안내
          />
          {/* 이메일 필드의 에러 메시지 표시 */}
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          {/* 이름 입력 필드 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            새로운 이름
          </label>
          <input
            type="text"
            {...register('name')} // React Hook Form과 연결
            className="w-full px-3 py-2 border rounded-md"
            placeholder="변경할 이름을 입력하세요" // 사용자에게 입력 안내
          />
          {/* 이름 필드의 에러 메시지 표시 */}
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isPending} // 요청 중일 때 버튼 비활성화
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isPending ? '수정 중...' : '수정하기'} {/* 버튼 텍스트 동적 변경 */}
        </button>
      </form>
    </div>
  )
}
