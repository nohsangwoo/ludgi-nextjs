import { logout } from '@/lib/server/sessionControl'

export default function Logout() {
  return (
    <form action={logout} className="mt-4">
      <button
        type="submit"
        className="w-full max-w-md px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        로그아웃
      </button>
    </form>
  )
}
