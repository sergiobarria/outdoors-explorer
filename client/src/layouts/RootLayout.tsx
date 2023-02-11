import { Link, Outlet } from 'react-router-dom'

import { LOGO } from '@/assets'

export const RootLayout = () => {
  return (
    <div id="main-container">
      <header>
        <nav className="container">
          <ul>
            <li>
              <img src={LOGO} alt="logo" width={150} />
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/campgrounds">Campgrounds</Link>
            </li>

            <li role="button">Sign In</li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="container">
        <section>
          <small>© {new Date().getFullYear()} Outdoors Explorer</small>
        </section>
      </footer>
    </div>
  )
}
