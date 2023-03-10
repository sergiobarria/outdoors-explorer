import { useLoaderData, useNavigate, LoaderFunctionArgs } from 'react-router-dom'
import clsx from 'clsx'
import { toast } from 'react-toastify'

import { deleteCampground, getCampground } from '@/lib'
import type { Campground } from '@/utils/validation'

import { StarIcon } from '@heroicons/react/20/solid'

// TODO: Remove this when reviews API is implemented
const reviews = { average: 4, totalCount: 1624 }

export const CampgroundDetailsPage = () => {
  const campground = useLoaderData() as Campground
  const navigate = useNavigate()

  async function handleDeleteCampground(id: string) {
    await deleteCampground(id)
    toast.success('Campground successfully deleted!', {
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
    navigate('/')
  }

  return (
    <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* campground details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {campground.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              campground information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-white sm:text-xl">${campground.price}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            reviews.average > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{campground.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={campground.image}
              alt={campground.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <div className="mt-10 flex items-center justify-between gap-6">
              <button
                className="btn-primary btn flex-1"
                onClick={() => navigate(`/campgrounds/${campground.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn-outline btn-error btn flex-1"
                onClick={() => handleDeleteCampground(campground.id as string)}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

CampgroundDetailsPage.loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params
  return await getCampground(id as string)
}
