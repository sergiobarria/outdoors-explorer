import express from 'express'

import {
  createCampground,
  deleteCampground,
  getCampground,
  getCampgrounds,
  updateCampground
} from '@/controllers/campgrounds.controller'
import { validateResource } from '@/middleware/validateResource.middleware'
import {
  getCampgroundSchema,
  createCampgroundSchema,
  updateCampgroundSchema,
  deleteCampgroundSchema
} from '@/schemas/campground.schema'

const router = express.Router()

router
  .route('/')
  .get(getCampgrounds)
  .post(validateResource(createCampgroundSchema), createCampground)

router
  .route('/:id')
  .get(validateResource(getCampgroundSchema), getCampground)
  .put(validateResource(updateCampgroundSchema), updateCampground)
  .delete(validateResource(deleteCampgroundSchema), deleteCampground)

export { router as campgroundsRouter }
