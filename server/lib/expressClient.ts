import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var expressClient: PrismaClient | undefined
}

const expressClient = global.expressClient || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.expressClient = expressClient

export default expressClient
