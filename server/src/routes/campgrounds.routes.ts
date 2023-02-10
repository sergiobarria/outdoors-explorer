import express from 'express'

import { getCampground, getCampgrounds } from '@controllers/campgrounds.controller'

const router = express.Router()

router.route('/').get(getCampgrounds)

router.route('/:id').get(getCampground)

export { router as campgroundsRouter }
