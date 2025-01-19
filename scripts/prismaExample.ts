import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await basicCRUD()
  await relationQueries()
  await filteringAndPagination()
  await aggregationsAndGrouping()
  await transactions()
  await advancedQueries()
}

// 1. 기본적인 CRUD 작업 예제
// CRUD는 Create(생성), Read(읽기), Update(수정), Delete(삭제)의 약자입니다.
// 데이터베이스의 가장 기본적인 작업들을 보여줍니다.
async function basicCRUD() {
  // CREATE: 새로운 사용자 생성
  // prisma.user.create()를 사용하여 새로운 사용자를 데이터베이스에 추가합니다.
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: '홍길동',
      password: 'password123',
    },
  })
  console.log('생성된 사용자:', newUser)

  // READ: 데이터 조회 방법들
  // 1. 단일 사용자 조회 - 고유한 값(unique)으로 찾기
  const user = await prisma.user.findUnique({
    where: {
      email: 'test@example.com', // email은 schema에서 @unique로 설정되어 있음
    },
  })

  // 2. 여러 사용자 조회 - 조건에 맞는 모든 사용자
  const users = await prisma.user.findMany({
    where: {
      name: '홍길동',
    },
  })

  // 3. 첫 번째 일치하는 사용자만 조회
  const firstUser = await prisma.user.findFirst({
    where: {
      name: '홍길동',
    },
  })

  // UPDATE: 사용자 정보 수정
  // where로 수정할 대상을 지정하고, data로 변경할 내용을 지정합니다.
  const updatedUser = await prisma.user.update({
    where: {
      email: 'test@example.com',
    },
    data: {
      name: '김철수',
    },
  })

  // 여러 레코드 한 번에 수정
  const updateManyUsers = await prisma.user.updateMany({
    where: {
      name: '홍길동',
    },
    data: {
      name: '김철수',
    },
  })

  // DELETE: 사용자 삭제
  // unique 필드로 특정 사용자를 삭제합니다.
  const deletedUser = await prisma.user.delete({
    where: {
      email: 'test@example.com',
    },
  })

  // 여러 레코드 한 번에 삭제
  const deleteManyUsers = await prisma.user.deleteMany({
    where: {
      name: '김철수',
    },
  })
}

// 2. 관계 쿼리 예제
// Prisma는 관계형 데이터베이스의 관계(1:1, 1:N, N:M)를 쉽게 다룰 수 있습니다.
async function relationQueries() {
  // 사용자와 관련 데이터를 한 번에 생성
  // 중첩된 쓰기(nested writes)를 통해 연관된 데이터를 한 번에 생성할 수 있습니다.
  const userWithRelations = await prisma.user.create({
    data: {
      email: 'relation@test.com',
      name: '관계테스트',
      password: 'password123',
      // 1:N 관계: 한 사용자가 여러 개의 게시글을 가질 수 있음
      posts: {
        create: [
          { title: '첫 번째 글', content: '내용입니다' },
          { title: '두 번째 글', content: '내용입니다' },
        ],
      },
      // 1:1 관계: 한 사용자는 하나의 프로필만 가질 수 있음
      profile: {
        create: {
          bio: '자기소개입니다',
        },
      },
    },
    // include를 사용하여 생성된 관계 데이터도 함께 조회
    include: {
      posts: true,
      profile: true,
    },
  })

  // 중첩된 관계 데이터 조회
  // include와 select를 사용하여 필요한 관계 데이터만 선택적으로 가져올 수 있습니다.
  const userWithNestedData = await prisma.user.findUnique({
    where: {
      email: 'relation@test.com',
    },
    include: {
      posts: {
        select: {
          // select를 사용하여 필요한 필드만 선택
          title: true,
          content: true,
        },
      },
      profile: true,
    },
  })

  // 관계 데이터 수정 예제
  const updateUserWithRelations = await prisma.user.update({
    where: {
      email: 'relation@test.com',
    },
    data: {
      posts: {
        // 기존 게시글 수정
        update: {
          where: {
            id: 1,
          },
          data: {
            title: '수정된 제목',
          },
        },
        // 새 게시글 추가
        create: {
          title: '새로운 글',
          content: '새로운 내용',
        },
      },
    },
  })
}

// 3. 필터링과 페이지네이션 예제
// 데이터를 필터링하고 페이지 단위로 가져오는 방법을 보여줍니다.
async function filteringAndPagination() {
  // 고급 필터링 예제
  const filteredUsers = await prisma.user.findMany({
    where: {
      AND: [
        // AND 조건: 모든 조건을 만족해야 함
        { name: { contains: '김' } }, // 이름에 '김'이 포함된
        { posts: { some: { published: true } } }, // 게시글이 하나라도 발행된
      ],
      OR: [
        // OR 조건: 하나라도 만족하면 됨
        { email: { endsWith: '@gmail.com' } },
        { email: { endsWith: '@naver.com' } },
      ],
      NOT: {
        // NOT 조건: 조건을 만족하지 않는
        profile: { is: null }, // 프로필이 없는 사용자 제외
      },
    },
  })

  // 페이지네이션과 정렬
  const pagedPosts = await prisma.post.findMany({
    skip: 0, // 건너뛸 레코드 수 (페이지 번호 * 페이지 크기)
    take: 10, // 가져올 레코드 수 (페이지 크기)
    orderBy: {
      // 정렬 조건
      createdAt: 'desc', // 최신순 정렬
    },
    // 여러 필드로 정렬하기
    // orderBy: [
    //   { published: 'desc' },
    //   { createdAt: 'desc' }
    // ]
  })

  // 커서 기반 페이지네이션
  const cursorPosts = await prisma.post.findMany({
    take: 10,
    cursor: {
      // 마지막으로 가져온 레코드의 ID
      id: 42,
    },
    orderBy: {
      id: 'asc',
    },
  })
}

// 4. 집계와 그룹핑 예제
async function aggregationsAndGrouping() {
  // 게시글 수 집계
  const postCount = await prisma.post.count()

  // 사용자별 게시글 수 집계
  const userPostCounts = await prisma.user.findMany({
    select: {
      name: true,
      _count: {
        select: { posts: true },
      },
    },
  })
}

// 5. 트랜잭션 예제
async function transactions() {
  // 트랜잭션으로 여러 작업을 한 번에 처리
  const [newUser, newPost] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: 'transaction@test.com',
        name: '트랜잭션테스트',
        password: 'password123',
      },
    }),
    prisma.post.create({
      data: {
        title: '트랜잭션으로 작성된 글',
        content: '내용입니다',
        authorId: 1, // 실제로는 위에서 생성된 사용자의 ID를 사용해야 합니다
      },
    }),
  ])
}

// 고급 쿼리 예제
async function advancedQueries() {
  // 원시 SQL 쿼리 실행
  const result = await prisma.$queryRaw`
    SELECT * FROM "User" 
    WHERE "name" LIKE ${`%김%`}
  `

  // 중첩된 조건부 필터링
  const complexFilter = await prisma.user.findMany({
    where: {
      OR: [
        {
          AND: [
            { email: { endsWith: '@gmail.com' } },
            { posts: { some: { published: true } } },
          ],
        },
        {
          AND: [{ name: { startsWith: '김' } }, { profile: { isNot: null } }],
        },
      ],
    },
  })

  // 관계 데이터 집계와 그룹화
  const userStats = await prisma.user.groupBy({
    by: ['name'],
    _count: {
      _all: true,
    },
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
  })
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
