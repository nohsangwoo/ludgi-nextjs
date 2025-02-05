import { SessionData } from "../../../../../../../server/lib/session";

export default function UserProfile({ session }: { session: SessionData }) {
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">사용자 정보</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">이메일:</span> {session.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">이름:</span> {session.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">로그인 상태:</span>{' '}
          {session.isLoggedIn ? '로그인됨' : '로그아웃됨'}
        </p>
      </div>
    </div>
  )
}
