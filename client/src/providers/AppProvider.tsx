import { PropsWithChildren } from 'react'

import { AppRouter } from './RouterProvider'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <AppRouter />
}
