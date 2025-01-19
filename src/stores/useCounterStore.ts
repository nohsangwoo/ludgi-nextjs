import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { STORAGE_KEYS_ENUM } from './storage-keys'
import { immer } from 'zustand/middleware/immer'
import { useStore } from 'zustand'

type CounterStoreState = {
  count: number
  persistedCount: number
}

type CounterStoreActions = {
  actions: {
    increment: () => void
    decrement: () => void
    incrementSync: () => Promise<void>
    decrementSync: () => Promise<void>
  }
}

type CounterStore = CounterStoreState & CounterStoreActions

export const counterStore = createStore<CounterStore>()(
  immer(
    persist(
      set => ({
        count: 0,
        persistedCount: 0,
        actions: {
          increment: () =>
            set(state => ({
              count: state.count + 1,
              persistedCount: state.persistedCount + 1,
            })),
          decrement: () =>
            set(state => ({
              count: state.count - 1,
              persistedCount: state.persistedCount - 1,
            })),
          incrementSync: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            set(state => ({
              count: state.count + 1,
              persistedCount: state.persistedCount + 1,
            }))
          },
          decrementSync: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            set(state => ({
              count: state.count - 1,
              persistedCount: state.persistedCount - 1,
            }))
          },
        },
      }),
      {
        name: STORAGE_KEYS_ENUM.COUNTER,
        partialize: state => ({ persistedCount: state.persistedCount }),
      },
    ),
  ),
)

export function useCounterStore() {
  return useStore(counterStore)
}

// 필요한경우 value와 actions로 나눠서 사용
export function useCounterValue() {
  return useStore(counterStore, state => state.count)
}

export function useCounterActions() {
  return useStore(counterStore, state => state.actions)
}
