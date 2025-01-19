export const STORAGE_KEYS_ENUM = {
  POSITION: 'position-storage',
  COUNTER: 'counter-storage',
} as const

export type STORAGE_KEYS_ENUM_TYPE =
  (typeof STORAGE_KEYS_ENUM)[keyof typeof STORAGE_KEYS_ENUM]
