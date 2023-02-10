import { Form, useLoaderData } from 'react-router-dom'

import type { Campground } from '@/utils/validation'

export const CampgroundEditPage = () => {
  const campground = useLoaderData() as Campground

  return (
    <div>
      <h1>Edit Campground</h1>

      <Form method="put" action={`/campgrounds/${campground.id}/edit`}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" defaultValue={campground.title} />
        </fieldset>

        <fieldset>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={campground.location}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" defaultValue={campground.price} />
        </fieldset>

        <fieldset>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={campground.description}
          ></textarea>
        </fieldset>

        <button type="submit">Update Campground</button>
      </Form>
    </div>
  )
}
