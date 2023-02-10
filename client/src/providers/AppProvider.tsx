import { PropsWithChildren } from 'react'

import { QueryProvider } from './QueryProvider'
import { AppRouter } from './RouterProvider'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}
