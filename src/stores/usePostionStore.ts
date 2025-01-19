import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS_ENUM } from './storage-keys'
import { immer } from 'zustand/middleware/immer'

type PositionStoreState = {
  context: {
    position: { x: number; y: number }
  }
}

type PositionStoreActions = {
  actions: {
    setPosition: (
      nextPosition: PositionStoreState['context']['position'],
    ) => void
  }
}

type PositionStore = PositionStoreState & PositionStoreActions

export const positionStore = createStore<PositionStore>()(
  immer(
    persist(
      set => ({
        context: {
          position: { x: 0, y: 0 },
        },
        actions: {
          setPosition: position => set({ context: { position } }),
        },
      }),
      {
        name: STORAGE_KEYS_ENUM.POSITION,
        partialize: state => ({ context: state.context }),
      },
    ),
  ),
)
