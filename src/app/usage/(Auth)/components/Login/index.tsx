'use client'

import { login, logout } from '@/lib/server/sessionControl'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const { toast } = useToast()

  const [state, formAction] = useActionState<
    { ok: boolean; error: string | null },
    FormData
  >(login, { ok: false, error: null })

  useEffect(() => {
    if (state.ok) {
      toast({
        variant: 'default',
        title: '로그인 성공',
        description: '환영합니다!',
        duration: 3000,
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            로그아웃
          </Button>
        ),
      })
    } else if (state.error) {
      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description: state.error,
        duration: 3000,
      })
    }
  }, [state, toast])

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        로그인
      </h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {state.error && (
          <p className="text-sm text-red-500 mt-1">{state.error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          로그인
        </button>
        <div>
          {state.ok
            ? 'Login Success'
            : state.error
            ? state.error
            : 'Login Failed'}
        </div>
      </form>
    </div>
  )
}
