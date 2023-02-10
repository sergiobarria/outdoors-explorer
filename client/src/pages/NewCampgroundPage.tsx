import { FecthError } from '@/utils/validation'
import { Form, useActionData, useNavigation } from 'react-router-dom'

export const NewCampgroundPage = () => {
  const data = useActionData() as FecthError | null
  const navigation = useNavigation()

  return (
    <div>
      <h1>Add New Campground</h1>
      {data?.isError && <p>{data?.message}</p>}
      <Form method="post" action="/campgrounds/new">
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </fieldset>

        <fieldset>
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" />
        </fieldset>

        <fieldset>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" />
        </fieldset>

        <fieldset>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </fieldset>

        <button type="submit" disabled={navigation.state === 'submitting'}>
          Add Campground
        </button>
      </Form>
    </div>
  )
}
