import fs from 'fs'
import path from 'path'
import { Table } from 'console-table-printer'
import chalk from 'chalk'

interface ListOptions {
  search?: string;
}

const getOperationType = (resolverPath: string): string => {
  try {
    const content = fs.readFileSync(resolverPath, 'utf-8')
    if (content.includes('Query: {')) {
      return '🔍 Query'
    } else if (content.includes('Mutation: {')) {
      return '✏️  Mutation'
    }
    return '📄 Unknown'
  } catch (error) {
    return '❌ Error'
  }
}

const list = async (options: ListOptions) => {
  const { search } = options

  try {
    console.log('\n')
    console.log(chalk.blue.bold('📋 GraphQL Resources List'))
    console.log(chalk.dim('====================================='))

    const graphqlPath = path.join(process.cwd(), 'server/graphql')

    if (!fs.existsSync(graphqlPath)) {
      console.error(
        chalk.red('❌ GraphQL directory not found:'),
        chalk.dim(graphqlPath),
      )
      return
    }

    const items = fs.readdirSync(graphqlPath)

    // 디렉토리만 필터링
    let directories = items.filter(item => {
      const fullPath = path.join(graphqlPath, item)
      return fs.statSync(fullPath).isDirectory()
    })

    // 검색어가 있는 경우 필터링
    if (search) {
      directories = directories.filter(dir =>
        dir.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (directories.length === 0) {
      console.log('\n')
      console.log(chalk.yellow('ℹ️  No resources found'))
      if (search) {
        console.log(chalk.dim(`Search term: "${search}"`))
      }
      return
    }

    // 리소스 정보 테이블 생성
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

    // 검색 결과 헤더 출력
    console.log('\n')
    if (search) {
      console.log(chalk.yellow(`🔍 Filtered by: "${search}"`))
      console.log(chalk.dim(`Found ${directories.length} matching resources`))
    } else {
      console.log(chalk.green(`📦 Total Resources: ${directories.length}`))
    }

    // 테이블 출력
    console.log('\n')
    table.printTable()

    // 폴더 구조 출력
    console.log('\n📂 Resource Structure:')
    console.log(chalk.dim('server/graphql/'))
    directories.forEach(dir => {
      const files = fs.readdirSync(path.join(graphqlPath, dir))
      console.log(chalk.dim(`└── ${dir}/`))
      files.forEach(file => {
        console.log(chalk.dim(`    └── ${file}`))
      })
    })

    console.log('\n')
    console.log(chalk.dim('====================================='))
  } catch (error) {
    console.log('\n')
    console.error(chalk.red.bold('❌ Error listing GraphQL resources:'))
    console.error(chalk.red(error))
  }
}

export default list
