import { AppRouter } from './RouterProvider'
import { ThemeProvider } from './ThemeProvider'

export const AppProvider = () => {
  return (
    // <ThemeProvider>
    <AppRouter />
    // </ThemeProvider>
  )
}
