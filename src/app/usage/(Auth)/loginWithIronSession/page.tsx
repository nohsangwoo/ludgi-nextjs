import {
  SessionData,
  sessionOptions,
  defaultSession,
} from '../../../../../server/lib/session'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import Login from './components/Login'
import Logout from './components/Logout'
import UserProfile from './components/UserProfile'

export default async function LogInAndLogoutPage() {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

  if (!session.isLoggedIn) {
    session.email = defaultSession?.email
    session.name = defaultSession?.name
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Login />
        {session.isLoggedIn && (
          <>
            <UserProfile session={session} />
            <Logout />
          </>
        )}
      </div>
    </div>
  )
}
