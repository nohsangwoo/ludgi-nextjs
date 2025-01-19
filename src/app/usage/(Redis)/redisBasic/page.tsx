'use client'
import { getUserWithRedis } from '@/graphql/apis'
import { useQuery } from '@tanstack/react-query'

export default function RedisBasic() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserWithRedis'],
    queryFn: () => getUserWithRedis(),
  })

  const users = data?.getUserWithRedis.users

  console.log('users with redis: ', users)

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">사용자 목록</h2>
      <div className="grid gap-4">
        {users?.map(user => (
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

      {users?.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          등록된 사용자가 없습니다.
        </div>
      )}
    </div>
  )
}
