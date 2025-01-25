import type { Context } from '../type'
import { TestMutationMutationVariables, TestMutationResult } from '../../generated/graphql'

const resolvers = {
  Mutation: {
    testMutation: async (
      _parent: unknown,
      args: TestMutationMutationVariables,
      context: Context,
    ): Promise<TestMutationResult> => {
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
