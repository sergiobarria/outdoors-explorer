import { Link, LoaderFunction, useLoaderData } from 'react-router-dom'

import type { Campground } from '@/utils/validation'
import { Hero } from '@/components'
import { getCampgrounds } from '@/lib'

export const HomePage = () => {
  const campgrounds = useLoaderData() as Campground[]

  return (
    <>
      <Hero />
      <section className="container mx-auto my-16 max-w-7xl">
        <h2 className="mb-6 text-center text-2xl font-bold md:text-4xl">
          Featured Campgrounds
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {campgrounds.slice(0, 4).map((campground) => (
            <article
              key={campground.id}
              className="card image-full mx-auto w-full max-w-[32rem] bg-base-100 shadow-xl"
            >
              <figure>
                <img src={campground.image} alt="campground cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{campground.title}</h2>
                <p>{campground.description.substring(0, 100)}...</p>
                <div className="card-actions justify-end">
                  <Link to={`/campgrounds/${campground.id}`} className="btn-primary btn">
                    Learn More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

HomePage.loader = async () => {
  return await getCampgrounds()
}
