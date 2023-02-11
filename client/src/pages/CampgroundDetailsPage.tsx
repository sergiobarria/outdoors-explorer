import { Link, useLoaderData, useNavigate } from 'react-router-dom'

import { deleteCampground } from '@/lib'
import type { Campground } from '@/types'

export const CampgroundDetailsPage = () => {
  const campground = useLoaderData() as Campground
  const navigate = useNavigate()

  async function handleDeleteCampground(id: string) {
    await deleteCampground(id)
    navigate('/')
  }

  return (
    <div>
      <h1>
        {campground?.title} - ID: {campground.id}
      </h1>
      <p>{campground?.location}</p>
      <div>
        <Link to={`/campgrounds/${campground.id}/edit`} role="button">
          Edit
        </Link>
        <button type="button" onClick={() => handleDeleteCampground(campground.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
