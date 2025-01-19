import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 실험해보고 싶은 prisma 코드를 작성해보세요.
  // 실행 커맨드: npx tsx scripts/prismaPlayGround.ts
  //   ...

  const firstUser = await prisma.user.findFirst({})

  console.log('first user: ', firstUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
