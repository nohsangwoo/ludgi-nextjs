'use server'

import { cookies } from 'next/headers'
import { defaultSession, SessionData, sessionOptions } from '../../../server/lib/session'
import { getIronSession } from 'iron-session'
import * as argon2 from 'argon2'
import client from '@/lib/server/client'

export const getSession = async () => {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  if (!session.isLoggedIn) {
    session.email = defaultSession?.email
    session.name = defaultSession?.name
    session.isLoggedIn = defaultSession.isLoggedIn
  }
  return session
}

export const login = async (prevState: unknown, formData: FormData) => {
  const session = await getSession()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('email, password', email, password)

  try {
    /**
     * 1. 사용자 조회
     * - 이메일로 사용자 존재 여부 확인
     * - 비밀번호 해시 값 가져오기
     */
    const user = await client.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // 해시된 비밀번호
      },
    })

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 일치하지 않습니다')
    }

    /**
     * 2. 비밀번호 검증
     * - Argon2를 사용하여 입력된 비밀번호와 저장된 해시 비교
     * - verify 메서드는 내부적으로 타이밍 공격 방지 로직 포함
     */
    const isValidPassword = await argon2.verify(user.password, password)

    if (!isValidPassword) {
      throw new Error('이메일 또는 비밀번호가 일치하지 않습니다')
    }

    /**
     * 3. 세션 업데이트
     * - 검증된 사용자 정보로 세션 데이터 설정
     * - 민감한 정보(비밀번호 등)는 제외
     */
    session.email = user.email
    session.name = user?.name ?? undefined
    session.isLoggedIn = true

    // 세션 저장
    await session.save()

    // 로그인 성공 시 홈페이지로 리다이렉트
    // permanentRedirect('/')
    return { ok: true, error: null }
  } catch (error) {
    /**
     * 에러 처리
     * - 프로덕션 환경에서는 구체적인 에러 메시지 노출 주의
     */
    console.error('Login error:', error)

    // 클라이언트에 에러 전달
    // Next.js 13 이상에서는 서버 컴포넌트에서 에러를 throw하면
    // 가장 가까운 error boundary에서 캐치됨
    // throw new Error('로그인에 실패했습니다. 다시 시도해 주세요.')
    return { ok: false, error: '로그인에 실패했습니다. 다시 시도해 주세요.' }
  }
}

export const logout = async () => {
  const session = await getSession()
  session.destroy()
}
