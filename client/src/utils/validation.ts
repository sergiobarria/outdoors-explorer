import { z } from 'zod'

export const CampgroundSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({
      required_error: 'Campground title is required'
    })
    .min(1)
    .max(100),
  location: z
    .string({
      required_error: 'Campground location is required'
    })
    .min(1)
    .max(100),
  price: z.number({
    required_error: 'Campground price is required'
  }),
  description: z
    .string({
      required_error: 'Campground description is required'
    })
    .min(1)
    .max(1000)
})

export const ErrorSchema = z.object({
  isError: z.boolean(),
  message: z.string()
})

export type Campground = z.infer<typeof CampgroundSchema>
export type FecthError = z.infer<typeof ErrorSchema>
