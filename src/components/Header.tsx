import Link from 'next/link'

export function Header() {
  return (
    <div className="flex h-[64px] justify-between items-center w-full px-[34px] border-b border-gray-200 shadow">
      <nav className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link href="/">
            <div className="text-lg font-bold">Main</div>
          </Link>
          <Link className="flex items-center" href="/usage">
            <div className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
              Usage
            </div>
          </Link>
          <Link className="flex items-center" href="/shop">
            <div className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
              Shop
            </div>
          </Link>
        </div>
        <div>right</div>
      </nav>
    </div>
  )
}
