import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function createDummyData(userCount: number) {
  console.log('더미 데이터 생성을 시작합니다...')

  for (let i = 0; i < userCount; i++) {
    // 기본 비밀번호 해싱 (모든 유저 "Test123!@#" 로 통일)
    const hashedPassword = await argon2.hash('Test123!@#', {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    })

    // 유저 생성
    const user = await prisma.user.create({
      data: {
        email: `user${i + 1}@example.com`,
        name: `테스트유저${i + 1}`,
        password: hashedPassword,
        // 프로필 생성
        profile: {
          create: {
            bio: `테스트유저${i + 1}의 자기소개입니다.`,
          },
        },
        // 포스트 100개 생성
        posts: {
          create: Array.from({ length: 100 }, (_, j) => ({
            title: `${i + 1}번 유저의 ${j + 1}번째 포스트`,
            content: `이것은 ${i + 1}번 유저의 ${j + 1}번째 포스트의 내용입니다.`,
            published: Math.random() > 0.3, // 70% 확률로 published true
          })),
        },
      },
    })

    console.log(`${i + 1}번째 유저와 관련 데이터 생성 완료`)
  }

  // 최종 데이터 수 확인
  const totalUsers = await prisma.user.count()
  const totalProfiles = await prisma.profile.count()
  const totalPosts = await prisma.post.count()

  console.log('\n=== 데이터 통계 ===')
  console.log(`총 유저 수: ${totalUsers}`)
  console.log(`총 프로필 수: ${totalProfiles}`)
  console.log(`총 포스트 수: ${totalPosts}`)
}

async function main() {
  const USER_COUNT = 20 // 생성할 유저 수 지정
  
  try {
    // 기존 데이터 삭제 (순서 주의)
    await prisma.post.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.user.deleteMany()
    
    console.log('기존 데이터 삭제 완료')
    
    await createDummyData(USER_COUNT)
    console.log('더미 데이터 생성이 완료되었습니다!')
  } catch (error) {
    console.error('에러 발생:', error)
  }
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

export {}
