import dogs from './dogs.json' assert { type: 'json' }
import { Context } from '../type'
import { DogByNameQueryVariables } from '../../generated/graphql'
// var _ = require('lodash');
import _ from 'lodash'

const resolvers = {
  Query: {
    dogByName: async (
      _parent: unknown,
      args: DogByNameQueryVariables,
      context: Context,
    ) => {
      const { name } = args
      const dog = dogs.find(dog => dog.name === name)

      console.log('context: ', context.customData)

      console.log('dog: ', dog)

      if (dog === undefined) {
        throw new Error('Dog not found')
      }

      // var array = [1]
      // // @ts-ignore
      // var other = _.concat(array, 2, [3], [[4]])

      // console.log(other)

      // // 이 부분을 수정하여 zx 모듈을 동적으로 불러오기
      // // google zx사용 법 연구해야함
      // // const { $ } = await import('zx')
      // const CMD = 'df -h;ls ~/'
      // // const result = await $`cat package.json | grep name`
      // // console.log('cmd: ', result)

      // // async function runCommand() {
      // //   const result = await $`cat package.json | grep name`
      // //   return result
      // // }
      // // const runcmdResult = await runCommand()

      // // console.log('runcmdResult: ', runcmdResult)
      console.log('test console.log')

      return dog
    },
  },
}

export default resolvers
