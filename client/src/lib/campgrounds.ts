import axios from 'axios'
import { ZodError } from 'zod'

// import { Campground } from '@/types'
import { CampgroundSchema, type Campground } from '@/utils/validation'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function mapFormDataToCampground(formData: FormData) {
  let campground: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    if (key === 'price') {
      campground[key] = Number(value as string)
    } else {
      campground[key] = value
    }
  }

  return campground
}

interface APIResponse<T> {
  data: T
  count: number
  success: string
}

type GetCampgroundsResponse = APIResponse<Campground[]>
type GetCampgroundResponse = Omit<APIResponse<Campground>, 'count'>
type CreateCampgroundResponse = APIResponse<Campground>
type UpdateCampgroundResponse = APIResponse<Campground>

export const getCampgrounds = async () => {
  const {
    data: { data }
  } = await axios.get<GetCampgroundsResponse>(`${API_URL}/api/v1/campgrounds`)
  return data
}

export const getCampground = async (id: string) => {
  const {
    data: { data }
  } = await axios.get<GetCampgroundResponse>(`${API_URL}/api/v1/campgrounds/${id}`)
  return data
}

export const createCampground = async (data: FormData) => {
  const campground = mapFormDataToCampground(data)

  try {
    const validatedCampground = CampgroundSchema.parse(campground)

    const {
      data: { data, success }
    } = await axios.post<CreateCampgroundResponse>(
      `${API_URL}/api/v1/campgrounds`,
      validatedCampground
    )

    return { isError: false, message: '', data, success }
  } catch (error) {
    return { isError: true, message: 'Invalid campground data' }
  }
}

export const updateCampground = async (id: string, data: FormData) => {
  const campground = mapFormDataToCampground(data)

  try {
    const validatedCampground = CampgroundSchema.parse(campground)

    const {
      data: { data }
    } = await axios.put<UpdateCampgroundResponse>(
      `${API_URL}/api/v1/campgrounds/${id}`,
      validatedCampground
    )

    return { isError: false, message: '', data }
  } catch (error) {
    return { isError: true, message: 'Invalid campground data' }
  }
}

export const deleteCampground = async (id: string) => {
  await axios.delete(`${API_URL}/api/v1/campgrounds/${id}`)
}
