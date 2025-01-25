import type { Context } from '../type'
import {
  ChildType,
  GetTestQueryVariables,
  GetTestResult,
} from '../../generated/graphql'

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
        text: 'test text',
      }
    },
  },
  getTestResult: {
    child: async (
      parent: GetTestResult,
      _args: unknown,
      context: Context,
    ): Promise<ChildType[]> => {
      console.log('touch child field resolver')
      console.log('parent in child: ', parent)
      return [
        {
          childText: 'hahaha child text in child field resolver',
        },
        {
          childText: 'hahaha child text in child field resolver 2',
        },
      ]
    },
  },
  // childType: {
  //   childText: async (
  //     parent: ChildType,
  //     _args: unknown,
  //     context: Context,
  //   ): Promise<string> => {
  //     console.log('parent in childText: ', parent)
  //     return 'childText in childType!! hohoho!!'
  //   },
  // },
}

export default resolvers
