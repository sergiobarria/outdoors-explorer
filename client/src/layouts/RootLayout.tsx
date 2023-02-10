import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <>
      <nav>Navigation</nav>
      <main>
        <Outlet />
      </main>
      <footer>App footer</footer>
    </>
  )
}
