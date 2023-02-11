import { Link, useLoaderData } from 'react-router-dom'
import { Container, SimpleGrid } from '@mantine/core'

import type { Campground } from '@/utils/validation'
import { CampgroundCard, Hero } from '@/components'

export const HomePage = () => {
  const campgrounds = useLoaderData() as Campground[]

  return (
    <div>
      <Hero />
      <section className="container mx-auto my-16">
        <h2 className="mb-6 text-center text-2xl font-bold md:text-4xl">Campgrounds</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {campgrounds.slice(0, 4).map((campground) => (
            <Link
              to={`/campgrounds/${campground._id}`}
              className="flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row"
            >
              <img
                className="h-full w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={campground.image}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {campground.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {campground.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
