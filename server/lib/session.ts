import { JwtPayload } from 'jsonwebtoken'
import { SessionOptions } from 'iron-session'

export interface SessionData {
  email?: string
  name?: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: {
    1: process.env.COOKIE_PASSWORD_1!,
    2: process.env.COOKIE_PASSWORD_2!,
  },
  cookieName: 'app-session',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    httpOnly: true, // 보안을 위해 JavaScript에서 접근 불가
    secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (개발시 false)
    // sameSite: 'lax', // CSRF 공격 방지
  },
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export interface TOKEN_TYPE extends JwtPayload {
  email: string
  userId: number
}
