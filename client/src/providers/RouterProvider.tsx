import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from '@/layouts'
import {
  HomePage,
  CampgroundDetailsPage,
  NewCampgroundPage,
  CampgroundEditPage
} from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Something went wrong</div>, // TODO: Add global error page
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />,
        loader: HomePage.loader
      },
      {
        path: '/campgrounds/:id',
        element: <CampgroundDetailsPage />,
        loader: CampgroundDetailsPage.loader
      },
      {
        path: '/campgrounds/new',
        element: <NewCampgroundPage />,
        action: NewCampgroundPage.action
      },
      {
        path: '/campgrounds/:id/edit',
        element: <CampgroundEditPage />,
        loader: CampgroundEditPage.loader,
        action: CampgroundEditPage.action
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
