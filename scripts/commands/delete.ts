import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { Table } from 'console-table-printer'
import chalk from 'chalk'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import updateSchemaFile from './helper/updateSchemaFile'

const execPromise = promisify(exec)

const getOperationType = (resolverPath: string): string => {
  try {
    const content = fs.readFileSync(resolverPath, 'utf-8')
    if (content.includes('Query: {')) {
      return '🔍 Query'
    } else if (content.includes('Mutation: {')) {
      return '✏️ Mutation'
    }
    return '📄 Unknown'
  } catch (error) {
    return '❌ Error'
  }
}

const updateApisFile = async () => {
  const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')
  const graphqlPath = path.join(process.cwd(), 'server/graphql')

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

const deleteGraphql = async () => {
  // 롤백을 위한 상태 추적
  const deletedFiles: { path: string; content: string }[] = []
  const modifiedFiles: { path: string; content: string }[] = []

  // 롤백 함수 정의
  const rollback = async () => {
    console.log(chalk.yellow('\n🔄 Rolling back changes...'))

    try {
      // 삭제된 파일들 복원
      for (const file of deletedFiles) {
        const dir = path.dirname(file.path)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(file.path, file.content)
      }

      // 수정된 파일들 복원
      for (const file of modifiedFiles) {
        fs.writeFileSync(file.path, file.content)
      }

      console.log(chalk.green('✅ Rollback completed'))
    } catch (rollbackError) {
      console.error(chalk.red.bold('❌ Error during rollback:'))
      console.error(chalk.red(rollbackError))
    }
  }

  try {
    console.log('\n')
    console.log(chalk.red.bold('🗑️  Delete GraphQL Resource'))
    console.log(chalk.dim('====================================='))

    const graphqlPath = path.join(process.cwd(), 'server/graphql')
    const directories = fs.readdirSync(graphqlPath).filter(item => {
      const isDirectory = fs
        .statSync(path.join(graphqlPath, item))
        .isDirectory()
      return isDirectory && item !== 'types' // types 디렉토리 제외
    })

    if (directories.length === 0) {
      console.log(chalk.yellow('\nℹ️  No GraphQL resources found'))
      return
    }

    // 리소스 목록 테이블 표시
    const table = new Table({
      columns: [
        { name: 'resource', title: 'Resource', alignment: 'left' },
        { name: 'type', title: 'Type', alignment: 'center' },
        { name: 'files', title: 'Files', alignment: 'center' },
      ],
    })

    directories.forEach(dir => {
      const dirPath = path.join(graphqlPath, dir)
      const files = fs.readdirSync(dirPath)
      const resolverFile = files.find(file => file.endsWith('.resolvers.ts'))

      let type = '📄 Type Only'
      if (resolverFile) {
        const resolverPath = path.join(dirPath, resolverFile)
        type = getOperationType(resolverPath)
      }

      table.addRow({
        resource: dir,
        type: type,
        files: `${files.length} files`,
      })
    })

    console.log('\n📦 Available Resources:')
    table.printTable()

    // 사용자 선택
    const { selectedResource } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedResource',
        message: 'Select a resource to delete:',
        choices: directories,
        loop: false, // 목록 순환 비활성화
      },
    ])

    // 삭제 확인
    const { confirmation } = await inquirer.prompt([
      {
        type: 'input',
        name: 'confirmation',
        message: chalk.red(
          `⚠️  DANGER: Type 'delete' to confirm removing ${selectedResource}:`,
        ),
        validate: (input: string) => {
          if (input === 'delete') return true
          return 'Please type "delete" to confirm'
        },
      },
    ])

    if (confirmation === 'delete') {
      const resourcePath = path.join(graphqlPath, selectedResource)

      // 삭제 전 파일들 백업
      const backupFiles = (dirPath: string) => {
        const files = fs.readdirSync(dirPath)
        files.forEach(file => {
          const filePath = path.join(dirPath, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory()) {
            backupFiles(filePath)
          } else {
            deletedFiles.push({
              path: filePath,
              content: fs.readFileSync(filePath, 'utf-8'),
            })
          }
        })
      }

      // schema.ts와 apis.ts 백업
      const schemaPath = path.join(process.cwd(), 'server/graphql/schema.ts')
      const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')

      if (fs.existsSync(schemaPath)) {
        modifiedFiles.push({
          path: schemaPath,
          content: fs.readFileSync(schemaPath, 'utf-8'),
        })
      }

      if (fs.existsSync(apisPath)) {
        modifiedFiles.push({
          path: apisPath,
          content: fs.readFileSync(apisPath, 'utf-8'),
        })
      }

      // 삭제할 리소스 백업
      backupFiles(resourcePath)

      console.log(chalk.yellow('\n🗑️  Removing files...'))
      fs.rmSync(resourcePath, { recursive: true })

      try {
        // schema.ts 파일 업데이트
        await updateSchemaFile()
        console.log('schema.ts updated')

        await new Promise(resolve => setTimeout(resolve, 3000)) // 3초 대기

        // npm run generate 실행
        console.log(chalk.yellow('\n📦 Updating GraphQL types...'))
        const { stdout, stderr } = await execPromise('npm run generate', {
          shell: 'bash',
        })

        // apis.ts 업데이트
        await updateApisFile()

        // 성공 메시지 및 테이블 출력
        console.log('\n')
        console.log(chalk.green.bold('✨ Resource Deletion Complete!'))
        console.log(chalk.dim('====================================='))
        console.log(chalk.green(`✅ Successfully removed: ${selectedResource}`))

        // 삭제된 파일 정보 표시
        const deletedTable = new Table({
          columns: [
            { name: 'action', title: 'Action', alignment: 'left' },
            { name: 'status', title: 'Status', alignment: 'center' },
          ],
        })

        deletedTable.addRow({
          action: `Remove ${selectedResource} directory`,
          status: '✅',
        })
        deletedTable.addRow({
          action: 'Update GraphQL types',
          status: '✅',
        })
        deletedTable.addRow({
          action: 'Update APIs file',
          status: '✅',
        })

        console.log('\n')
        deletedTable.printTable()

        // if (stderr) {
        //   console.log('\n')
        //   console.log(chalk.yellow('⚠️  Warnings:'))
        //   console.log(chalk.dim(stderr))
        // }
      } catch (error) {
        // 작업 중 에러 발생 시 롤백
        await rollback()
        throw error
      }
    } else {
      console.log(chalk.yellow('\n⚠️  Deletion cancelled'))
    }
  } catch (error) {
    console.log('\n')
    console.error(chalk.red.bold('❌ Error deleting GraphQL resource:'))
    console.error(chalk.red(error))
    process.exit(1)
  }
}

export default deleteGraphql
