import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { RootLayout } from '@/layouts'
import { HomePage, CampgroundDetailsPage, NewCampgroundPage } from '@/pages'
import { getCampgrounds, getCampground, createCampground, updateCampground } from '@/lib'
import { CampgroundEditPage } from '@/pages/CampgroundEditPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />,
        loader: async () => await getCampgrounds()
      },
      {
        path: '/campgrounds/:id',
        element: <CampgroundDetailsPage />,
        loader: async ({ params }) => await getCampground(params.id as string)
      },
      {
        path: '/campgrounds/new',
        element: <NewCampgroundPage />,
        action: async ({ request }) => {
          const formData = await request.formData()

          const { isError, data, message } = await createCampground(formData)
          if (isError) return { isError, message }

          return data?._id ? redirect(`/campgrounds/${data?._id}`) : redirect('/')
        }
      },
      {
        path: '/campgrounds/:id/edit',
        element: <CampgroundEditPage />,
        loader: async ({ params }) => await getCampground(params.id as string),
        action: async ({ request, params }) => {
          const { id } = params as { id: string }
          const formData = await request.formData()

          const { isError, data, message } = await updateCampground(id, formData)
          if (isError) return { isError, message }

          return data?._id ? redirect(`/campgrounds/${data?._id}`) : redirect('/')
        }
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
