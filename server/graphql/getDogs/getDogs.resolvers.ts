import type { Context } from '../type'
import dogs from '../dogByName/dogs.json' assert { type: 'json' }
import { GetDogsQueryVariables, GetDogsResult } from '../../generated/graphql'
import { $ } from 'zx'

const resolvers = {
  Query: {
    getDogs: async (
      _parent: unknown,
      args: GetDogsQueryVariables,
      context: Context,
    ): Promise<GetDogsResult[]> => {
      console.log('touch getdogs ')
      const result = await $`cat package.json | grep name`
      console.log('cmd: ', result)
      return dogs
    },
  },
}

export default resolvers
