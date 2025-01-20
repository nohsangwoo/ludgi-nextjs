import type { Context } from '../type'
import { GetTestQueryVariables, GetTestResult } from '../../generated/graphql'

const resolvers = {
  Query: {
    getTest: async (
      _parent: unknown,
      args: GetTestQueryVariables,
      context: Context,
    ): Promise<GetTestResult> => {
      // TODO: Implement your resolver logic

      console.log('args:', args)

      return {
        ok: true,
        text:"test text"
      }
    },
  },
}

export default resolvers
