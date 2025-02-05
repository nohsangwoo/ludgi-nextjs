import { getSession } from '@/lib/server/redisSessionControl'
import {
  SessionData,
  defaultSession,
} from '../../../../../server/lib/session'

import Logout from './components/Logout'
import UserProfile from './components/UserProfile'
import Login from './components/Login'
import { cookies } from 'next/headers'

export default async function LoginWithRedisSessionPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')

  let sessionData: SessionData = defaultSession

  if (sessionId) {
    sessionData = await getSession(sessionId.value)
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Login />
        {sessionData.isLoggedIn && (
          <>
            <UserProfile session={sessionData} />
            <Logout />
          </>
        )}
      </div>
    </div>
  )
}
