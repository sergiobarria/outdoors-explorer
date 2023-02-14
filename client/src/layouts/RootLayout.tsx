import { Fragment, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Transition, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LazyMotion, domAnimation } from 'framer-motion'

import { LOGO } from '@/assets'

const links = [
  { id: 1, text: 'Campgrounds', url: '/' },
  { id: 2, text: 'New Campground', url: '/campgrounds/new' }
]

const DesktopNavigation = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <ul className="flex">
        {links.map((link) => {
          const isActive = location.pathname === link.url
          return (
            <li key={link.id}>
              <Link
                to={link.url}
                className={`btn-ghost btn text-base normal-case ${
                  isActive ? 'text-green-500' : 'text-gray-500'
                }`}
              >
                {link.text}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to="/signin" className="btn-primary btn-md btn">
        Sign In
      </Link>
    </nav>
  )
}

const MobileNavigation = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <nav className="flex items-center gap-8 md:hidden">
      <Link to="/signin" className="btn-primary btn">
        Sign In
      </Link>
      {/* Menu */}
      <div className="relative inline-block text-left">
        <Menu>
          <Menu.Button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6 transform transition-all duration-200 hover:scale-105" />
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 z-50 mt-4 w-56 origin-top-right rounded-md bg-base-300 p-4 shadow-lg">
              {links.map((link) => {
                const isActive = location.pathname === link.url
                return (
                  <Menu.Item key={link.id}>
                    <Link
                      to={link.url}
                      className={`${
                        isActive ? 'rounded-lg bg-primary text-primary-content' : ''
                      } block px-4 py-2 text-sm text-gray-300`}
                      onClick={() => setShowMenu(false)}
                    >
                      {link.text}
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  )
}

const AppHeader = () => {
  return (
    <header>
      <div className="container navbar mx-auto max-w-7xl px-3 py-6">
        <div className="flex-1">
          <Link to="/" className="btn-ghost btn text-xl normal-case">
            <img src={LOGO} alt="outdoors explorer logo" width={150} />
          </Link>
        </div>
        <div className="flex-none">
          <DesktopNavigation />
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}

function AppFooter() {
  return (
    <footer className="my-6bg-base-300 footer footer-center p-4 text-base-content">
      <div className="container mx-auto max-w-7xl border-t border-gray-700 py-8">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Outdoors
          Explorer, Inc
        </p>
      </div>
    </footer>
  )
}

export const RootLayout = () => {
  return (
    <LazyMotion features={domAnimation}>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </LazyMotion>
  )
}
