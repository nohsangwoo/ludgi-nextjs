'use client'

import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ApolloProvider } from '@apollo/client'
import { apooloClient } from '@/lib/client/apolloClient'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
})
// queryClient.setQueryDefaults(['allGraphicDevices'], {
//   refetchOnMount: true,
//   refetchInterval: 1000 * 60,
// })

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apooloClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  )
}
