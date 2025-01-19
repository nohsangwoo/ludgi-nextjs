import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Table } from 'console-table-printer'
import chalk from 'chalk'
import updateSchemaFile from './helper/updateSchemaFile'
interface CreateOptions {
  name: string
}

const execPromise = promisify(exec)

// 첫 글자를 대문자로 변환하는 헬퍼 함수
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const updateApisFile = async () => {
  const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')
  const graphqlPath = path.join(process.cwd(), 'server/graphql')

  // 디렉토리만 필터링
  const directories = fs
    .readdirSync(graphqlPath)
    .filter(item => {
      const isDirectory = fs
        .statSync(path.join(graphqlPath, item))
        .isDirectory()
      return isDirectory && item !== 'types' // types 디렉토리 제외
    })
    .map(dir => `  ${dir}`)

  // apis.ts 파일 내용 업데이트
  const apisContent = `import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import { API_URL } from '../../server/lib/consts'

const gqlClient = new GraphQLClient(API_URL)

export const { 
${directories.join(',\n')} 
} = getSdk(gqlClient)
`

  fs.writeFileSync(apisPath, apisContent)
}

const create = async (options: CreateOptions) => {
  const { name } = options
  const graphqlPath = path.join(process.cwd(), 'server/graphql')
  const domainPath = path.join(graphqlPath, name)

  // 롤백을 위한 상태 추적
  const createdPaths: string[] = []
  const originalFiles: { path: string; content: string | null }[] = []

  // 롤백 함수 정의
  const rollback = async () => {
    console.log(chalk.yellow('\n🔄 Rolling back changes...'))

    // 생성된 파일/디렉토리 제거
    for (const path of createdPaths.reverse()) {
      if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
          fs.rmdirSync(path, { recursive: true })
        } else {
          fs.unlinkSync(path)
        }
      }
    }

    // 수정된 파일 복원
    for (const file of originalFiles) {
      if (file.content === null) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      } else {
        fs.writeFileSync(file.path, file.content)
      }
    }

    console.log(chalk.green('✅ Rollback completed'))
  }

  try {
    // 도메인 디렉토리 생성 전에 schema.ts와 apis.ts 백업
    const schemaPath = path.join(process.cwd(), 'server/graphql/schema.ts')
    const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')

    if (fs.existsSync(schemaPath)) {
      originalFiles.push({
        path: schemaPath,
        content: fs.readFileSync(schemaPath, 'utf-8'),
      })
    }

    if (fs.existsSync(apisPath)) {
      originalFiles.push({
        path: apisPath,
        content: fs.readFileSync(apisPath, 'utf-8'),
      })
    }

    // 도메인 디렉토리 생성
    if (!fs.existsSync(domainPath)) {
      fs.mkdirSync(domainPath)
      createdPaths.push(domainPath)
    }

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select GraphQL operation type:',
        choices: [
          { name: 'Query - Read operations (Fetch data)', value: 'query' },
          {
            name: 'Mutation - Write operations (Create/Update/Delete)',
            value: 'mutation',
          },
          {
            name: 'Subscription - Real-time updates',
            value: 'subscription',
          },
        ],
        default: 'query',
      },
    ])

    const type = answers.type
    console.log('chosen type:', type)

    if (!fs.existsSync(graphqlPath)) {
      console.error('GraphQL directory not found:', graphqlPath)
      return
    }

    const startTime = Date.now()
    console.log('\n')
    console.log(chalk.blue.bold('🚀 Creating GraphQL Resource...'))
    console.log(chalk.dim('====================================='))

    const EVENT_NAME = type === 'subscription' ? `${name.toUpperCase()}_EVENT` : null

    // 필요한 파일들 생성
    const files = [
      {
        name: `${name}.graphql`,
        content: type === 'subscription' 
          ? `subscription ${name}($id: Int) {
  ${name}(id: $id) {
    id
    title
    description
  }
}
`
          : `${type} ${name}(
  $id: Int!
  $isActive: Boolean!
  $description: String!
  $amount: Float!
) {
  ${name}(
    id: $id
    isActive: $isActive
    description: $description
    amount: $amount
  ) {
    title
    price
    isAvailable
  }
}
`,
      },
      {
        name: `${name}.resolvers.ts`,
        content: type === 'subscription'
          ? `import type { Context } from '../type'

export const ${EVENT_NAME} = '${EVENT_NAME}'

const resolvers = {
  Subscription: {
    ${name}: {
      subscribe: (_parent: unknown, _args: unknown, context: Context) => 
        context.pubsub.asyncIterator([${EVENT_NAME}])
    }
  }
}

export default resolvers
`
          : `import type { Context } from '../type'
import { ${capitalize(name)}${capitalize(type)}Variables } from '../../generated/graphql'

const resolvers = {
  ${capitalize(type)}: {
    ${name}: async (
      _parent: unknown,
      args: ${capitalize(name)}${capitalize(type)}Variables,
      context: Context,
    ) => {
      // TODO: Implement your resolver logic
      return {
        title: "Sample Title",
        price: 1000.0,
        isAvailable: true
      }
    },
  },
}

export default resolvers
`,
      },
      {
        name: `${name}.typeDefs.ts`,
        content: type === 'subscription'
          ? `import { gql } from 'graphql-tag'

export default gql\`
  type Subscription {
    ${name}(id: Int): ${capitalize(name)}Result!
  }

  type ${capitalize(name)}Result {
    id: Int!
    title: String!
    description: String!
  }
\`
`
          : `import { gql } from 'graphql-tag'

export default gql\`
  type ${name}Result {
    title: String!
    price: Float!
    isAvailable: Boolean!
  }

  type ${capitalize(type)} {
    ${name}(
      id: Int!
      isActive: Boolean!
      description: String!
      amount: Float!
    ): ${name}Result!
  }
\`
`,
      },
    ]

    files.forEach(file => {
      const filePath = path.join(domainPath, file.name)
      fs.writeFileSync(filePath, file.content)
      createdPaths.push(filePath)
    })

    // schema.ts 파일 업데이트
    await updateSchemaFile()

    console.log('schema.ts updated')

    // 생성된 파일 정보 수집
    const createdFiles = [
      { 
        file: `${name}.graphql`, 
        type: `${capitalize(type)} Definition`, 
        status: '✅' 
      },
      { file: `${name}.resolvers.ts`, type: 'Resolver', status: '✅' },
      { file: `${name}.typeDefs.ts`, type: 'Type Definition', status: '✅' },
    ]

    await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 대기

    // npm run generate 실행
    console.log(chalk.yellow('\n📦 Generating GraphQL Types...'))
    const { stdout, stderr } = await execPromise('npm run generate', {
      shell: 'bash',
    })



    // apis.ts 파일 업데이트
    await updateApisFile()

    // 실행 결과 테이블 출력
    const resultTable = new Table({
      columns: [
        { name: 'file', title: 'File', alignment: 'left' },
        { name: 'type', title: 'Type', alignment: 'left' },
        { name: 'status', title: 'Status', alignment: 'center' },
      ],
    })

    createdFiles.forEach(file => resultTable.addRow(file))

    console.log('\n')
    console.log(chalk.green.bold('✨ Resource Creation Complete!'))
    console.log(chalk.dim('====================================='))
    console.log('\n📁 Created Files:')
    resultTable.printTable()

    // 폴더 구조 출력
    console.log('\n📂 Folder Structure:')
    console.log(chalk.dim('server/graphql/'))
    console.log(chalk.dim(`└── ${name}/`))
    createdFiles.forEach(file => {
      console.log(chalk.dim(`    └── ${file.file}`))
    })

    // 실행 시간 계산
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    console.log('\n')
    console.log(chalk.dim('====================================='))
    console.log(chalk.green(`✅ Complete in ${duration}s`))
    console.log(chalk.blue(`📍 Location: ${chalk.underline(domainPath)}`))

    // if (stderr) {
    //   console.log('\n')
    //   console.log(chalk.yellow('⚠️  Warnings:'))
    //   console.log(chalk.dim(stderr))
    // }
  } catch (error) {
    console.log('\n')
    console.error(chalk.red.bold('❌ Error creating GraphQL resource:'))
    console.error(chalk.red(error))

    // 롤백 실행
    try {
      // await rollback()
    } catch (rollbackError) {
      console.error(chalk.red.bold('❌ Error during rollback:'))
      console.error(chalk.red(rollbackError))
    }

    process.exit(1)
  }
}

export default create
