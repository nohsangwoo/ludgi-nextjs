import { UsageNavigation } from './components/UsageNavigation'

export default function ReactHookFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex mx-auto w-full max-w-[1400px] space-y-8 px-4 pt-4">
        <UsageNavigation />
        <div className="w-full flex justify-center">{children}</div>
      </div>
    </div>
  )
}
