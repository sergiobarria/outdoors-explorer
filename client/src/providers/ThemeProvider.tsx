import { ReactNode } from 'react'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'green'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      {children}
    </MantineProvider>
  )
}
