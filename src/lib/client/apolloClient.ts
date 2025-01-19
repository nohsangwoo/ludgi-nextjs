import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'


const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/graphql'

const httpLink = new HttpLink({
  uri: apiUrl,
})

const wsUrl = process.env.NEXT_PUBLIC_WS_URL


const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

export const apooloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
