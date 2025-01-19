type RequiredEnvKeys =
  | 'DATABASE_URL'
  | 'NEXT_PUBLIC_API_URL'
  | 'NODE_ENV'
  | 'PORT'
  | 'WEBSOCKET_PORT'
  | 'REDIS_HOST'
  | 'REDIS_PORT'
  | 'REDIS_PASSWORD'
  | 'RABBITMQ_HOST'
  | 'RABBITMQ_PORT'
  | 'RABBITMQ_USERNAME'
  | 'RABBITMQ_PASSWORD'
  | 'COOKIE_PASSWORD_1'
  | 'COOKIE_PASSWORD_2'
  | 'AWS_ACCESS_KEY_ID'
  | 'AWS_SECRET_ACCESS_KEY'
  | 'AWS_REGION'
  | 'AWS_BUCKET_NAME'
  | 'NEXT_PUBLIC_AWS_BUCKET_CDN'
  | 'NEXTAUTH_URL'
  | 'NEXTAUTH_SECRET'

export function validateEnv() {
  const required: RequiredEnvKeys[] = [
    'DATABASE_URL',
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
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `필수 환경변수가 설정되지 않았습니다: ${missing.join(', ')}`,
    )
  }
}
