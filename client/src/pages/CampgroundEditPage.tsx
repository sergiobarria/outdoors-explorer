import {
  Form,
  useLoaderData,
  redirect,
  LoaderFunctionArgs,
  ActionFunctionArgs
} from 'react-router-dom'
import { m } from 'framer-motion'

import { CampgroundSchema, Campground } from '@/utils/validation'
import { getCampground, updateCampground } from '@/lib'

export const CampgroundEditPage = () => {
  const campground = useLoaderData() as Campground

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto my-28 max-w-xl rounded-lg bg-gray-700 p-8 md:p-10"
    >
      <h1 className="mb-6 text-3xl font-bold md:text-5xl">Edit Campground</h1>

      <Form
        method="put"
        action={`/campgrounds/${campground.id}/edit`}
        className="space-y-6"
      >
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
            defaultValue={campground.title}
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
            defaultValue={campground.location}
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
            defaultValue={campground.price}
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
            defaultValue={campground.image}
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
            defaultValue={campground.description}
          ></textarea>
        </fieldset>

        <button type="submit" className="btn-primary btn w-full">
          Update Campground
        </button>
      </Form>
    </m.div>
  )
}

CampgroundEditPage.loader = async ({ params }: LoaderFunctionArgs) => {
  return await getCampground(params.id as string)
}

CampgroundEditPage.action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params as { id: string }
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

  const { isError, data, message } = await updateCampground(id, campgroundData)
  if (isError) return { isError, message }

  return data?.id ? redirect(`/campgrounds/${data?.id}`) : redirect('/')
}
