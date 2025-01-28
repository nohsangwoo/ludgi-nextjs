import { PrismaClient } from '@prisma/client'
// import { withOptimize } from '@prisma/extension-optimize'
declare global {
  // eslint-disable-next-line no-var
  var expressPrismaClient: PrismaClient | undefined
  // var expressPrismaClient: ReturnType<typeof PrismaClient.prototype.$extends> | undefined
}

const expressPrismaClient = global.expressPrismaClient || new PrismaClient()
// const expressPrismaClient =
//   global.expressPrismaClient ||
//   new PrismaClient().$extends(
//     withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY }),
//   )

if (process.env.NODE_ENV === 'development')
  global.expressPrismaClient = expressPrismaClient

export default expressPrismaClient
