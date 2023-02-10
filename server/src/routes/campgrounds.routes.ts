import express from 'express'

import {
  createCampground,
  deleteCampground,
  getCampground,
  getCampgrounds,
  updateCampground
} from '@/controllers/campgrounds.controller'

const router = express.Router()

router.route('/').get(getCampgrounds).post(createCampground)

router.route('/:id').get(getCampground).put(updateCampground).delete(deleteCampground)

export { router as campgroundsRouter }
