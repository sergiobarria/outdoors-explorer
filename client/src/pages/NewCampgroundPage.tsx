import { FecthError } from '@/utils/validation'
import { Form, useActionData, useNavigation } from 'react-router-dom'

export const NewCampgroundPage = () => {
  const data = useActionData() as FecthError | null
  const navigation = useNavigation()

  return (
    <div className="container  mx-auto my-28 max-w-xl rounded-lg bg-gray-700 p-8 md:p-10">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Add New Campground</h1>
      {data?.isError && (
        <small className="w-full text-center text-red-500">{data?.message}</small>
      )}

      <Form method="post" action="/campgrounds/new" className="space-y-6">
        <fieldset>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">
            Title
          </label>
          <div className="mt-1">
            <input
              type="title"
              name="title"
              id="title"
              className="block w-full rounded-md border-gray-300 p-3 text-zinc-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="campground title"
            />
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="location" className="block text-sm font-medium text-gray-200">
            Location
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="location"
              id="location"
              className="block w-full rounded-md border-gray-300 p-3 text-zinc-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="campground location"
            />
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="price" className="block text-sm font-medium text-gray-200">
            Price
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="price"
              id="price"
              className="block w-full rounded-md border-gray-300 p-3 text-zinc-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="campground price"
            />
          </div>
        </fieldset>

        <fieldset>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-200"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              rows={6}
              id="description"
              className="block w-full rounded-md border-gray-300 p-3 text-zinc-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="campground description"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add New Campground
        </button>
      </Form>
    </div>
  )
}
