import { z } from 'zod'

const campgroundSchema = z.object({
  title: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  price: z.number().min(0),
  description: z.string().min(1).max(10000),
  image: z.string().optional()
})

export const createCampgroundSchema = z.object({
  body: campgroundSchema
})

export const getCampgroundSchema = z.object({
  params: z.object({
    id: z.string()
  })
})

export const updateCampgroundSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: campgroundSchema
})

export const deleteCampgroundSchema = z.object({
  params: z.object({
    id: z.string()
  })
})

export type CreateCampgroundType = z.infer<typeof createCampgroundSchema>['body']
export type GetCampgroundType = z.infer<typeof getCampgroundSchema>['params']
export type UpdateCampgroundType = z.infer<typeof updateCampgroundSchema>
export type DeleteCampgroundType = z.infer<typeof deleteCampgroundSchema>['params']
