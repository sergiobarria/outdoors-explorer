import { Link, useLoaderData, useNavigate } from 'react-router-dom'

import { deleteCampground } from '@/lib'
import type { Campground } from '@/utils/validation'

export const CampgroundDetailsPage = () => {
  const campground = useLoaderData() as Campground
  const navigate = useNavigate()

  async function handleDeleteCampground(id: string) {
    await deleteCampground(id)
    navigate('/')
  }

  console.log(campground)

  return (
    <div>
      <h1>
        {campground?.title} - ID: {campground._id}
      </h1>
      <p>{campground?.location}</p>
      <div>
        <img src={campground.image} alt={campground.title} />
      </div>
      <div>
        <Link to={`/campgrounds/${campground._id}/edit`} role="button">
          Edit
        </Link>
        <button
          type="button"
          onClick={() => handleDeleteCampground(campground._id as string)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
