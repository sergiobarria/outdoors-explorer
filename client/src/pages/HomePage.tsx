import { Link, useLoaderData } from 'react-router-dom'

import type { Campground } from '@/types'

export const HomePage = () => {
  const campgrounds = useLoaderData() as Campground[]

  return (
    <div>
      <h1>All Campgrounds</h1>
      {campgrounds?.map((campground) => (
        <div key={campground.id}>
          <Link to={`/campgrounds/${campground.id}`}>{campground?.title}</Link>
        </div>
      ))}
    </div>
  )
}
