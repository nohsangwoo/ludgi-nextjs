#!/usr/bin/env node
import { Command } from 'commander'
import figlet from 'figlet'
// import fs from 'fs'
// import path from 'path'
import createCommand from './commands/create'
import deleteCommand from './commands/delete'
import listCommand from './commands/list'

// figlet을 Promise로 감싸는 함수
const showBanner = () => {
  return new Promise((resolve, reject) => {
    figlet('LUDGI', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      console.log(data)
      console.log('\n') // 배너와 다음 내용 사이 간격 추가
      resolve(data)
    })
  })
}

// CLI 옵션들의 타입 정의
interface CliOptions {
  new?: string;
  delete?: string;
  ls?: string | boolean;
  mkdir?: string;
  touch?: string;
}

// 메인 로직을 async 함수로 분리
async function main() {
  try {
    // 먼저 배너 표시
    await showBanner()

    const program = new Command()

    program
      .version('1.0.0')
      .description('An example CLI for managing a directory')
      .option('-n, --new <value>', 'Create a new GraphQL resource')
      .option('-d, --delete', 'Delete a GraphQL resource')
      .option(
        '-l, --ls [value]',
        'List directory contents, optional search term',
      )
      .parse(process.argv)

    // opts()의 반환값에 타입 지정
    const options = program.opts() as CliOptions

    if (options.new) {
      await createCommand({
        name: options.new, // string 타입이 보장됨
      })
    }

    if (options.delete) {
      await deleteCommand()
    }

    if (options.ls) {
      const searchTerm = options.ls === true ? undefined : options.ls // union 타입 체크가 정확히 동작

      await listCommand({
        search: searchTerm,
      })
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// 메인 함수 실행
main()
