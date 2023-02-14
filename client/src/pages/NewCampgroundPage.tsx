import { createCampground } from '@/lib'
import { FecthError } from '@/utils/validation'
import { Form, LoaderFunctionArgs, redirect, useActionData } from 'react-router-dom'
import { m } from 'framer-motion'

import { CampgroundSchema } from '@/utils/validation'

export const NewCampgroundPage = () => {
  const data = useActionData() as FecthError | null

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto my-28 max-w-xl rounded-lg bg-gray-800 p-8 md:p-10"
    >
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Add New Campground</h1>
      {data?.isError && (
        <small className="w-full text-center text-red-500">{data?.message}</small>
      )}

      <Form method="post" action="/campgrounds/new" className="space-y-6">
        <fieldset className="form-control w-full">
          <label htmlFor="title" className="label">
            <span className="label-text">What is your campground name?</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            className="input-bordered input-primary input w-full focus:border-none focus:ring-0"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="location" className="label">
            <span className="label-text">What is your campground location?</span>
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location..."
            className="input-bordered input-primary input w-full focus:border-none focus:ring-0"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="price" className="label">
            <span className="label-text">What is your campground price?</span>
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price..."
            className="input-bordered input-primary input w-full focus:border-none focus:ring-0"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="image" className="label">
            <span className="label-text">What is your campground image?</span>
          </label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="image url..."
            className="input-bordered input-primary input w-full focus:border-none focus:ring-0"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="description" className="label">
            <span className="label-text">What is your campground description?</span>
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            className="textarea-primary textarea w-full focus:border-none focus:ring-0"
            placeholder="Campground description..."
          ></textarea>
        </fieldset>

        <button type="submit" className="btn-primary btn w-full">
          Add New Campground
        </button>
      </Form>
    </m.div>
  )
}

NewCampgroundPage.action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData()
  const campgroundData = {
    ...Object.fromEntries(formData),
    price: Number(formData.get('price'))
  }

  try {
    CampgroundSchema.parse(campgroundData)
  } catch (error: any) {
    return { isError: true, message: error.message }
  }

  const { isError, data, message } = await createCampground(campgroundData)
  if (isError) return { isError, message }

  return data?.id ? redirect(`/campgrounds/${data?.id}`) : redirect('/')
}
