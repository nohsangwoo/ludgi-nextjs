// 환경 변수 목록을 상수로 분리
const REQUIRED_ENV_KEYS = [
  'DATABASE_URL',
  'OPTIMIZE_API_KEY',
  'NEXT_PUBLIC_API_URL',
  'NODE_ENV',
  'PORT',
  'WEBSOCKET_PORT',
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
  'RABBITMQ_HOST',
  'RABBITMQ_PORT',
  'RABBITMQ_USERNAME',
  'RABBITMQ_PASSWORD',
  'COOKIE_PASSWORD_1',
  'COOKIE_PASSWORD_2',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_BUCKET_NAME',
  'NEXT_PUBLIC_AWS_BUCKET_CDN',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
] as const

export type RequiredEnvKeys = (typeof REQUIRED_ENV_KEYS)[number]

export function validateEnv() {
  const missing: RequiredEnvKeys[] = REQUIRED_ENV_KEYS.filter(
    key => !process.env[key],
  )

  if (missing.length > 0) {
    throw new Error(
      `필수 환경변수가 설정되지 않았습니다: ${missing.join(', ')}`,
    )
  }
}
