'use client'

import { useCounterStore } from '@/stores/useCounterStore'

export default function ZustandBasicExample() {
  const { count, actions } = useCounterStore()

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Zustand Counter Example</h1>

      <div className="mb-6">
        <p className="text-xl">Current Count: {count}</p>
      </div>

      <div className="space-y-4">
        {/* 동기 액션 */}
        <div className="flex gap-4">
          <button
            onClick={actions.increment}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Increment
          </button>
          <button
            onClick={actions.decrement}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Decrement
          </button>
        </div>

        {/* 비동기 액션 */}
        <div className="flex gap-4">
          <button
            onClick={actions.incrementSync}
            className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400 active:bg-blue-500 active:scale-95 transition-all"
          >
            Increment (Async)
          </button>
          <button
            onClick={actions.decrementSync}
            className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-400 active:bg-red-500 active:scale-95 transition-all"
          >
            Decrement (Async)
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        비동기 버튼은 1초 후에 카운트가 변경됩니다.
      </p>
    </div>
  )
}
