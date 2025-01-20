import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var expressPrismaClient: PrismaClient | undefined
}

const expressPrismaClient = global.expressPrismaClient || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.expressPrismaClient = expressPrismaClient

export default expressPrismaClient
