import express, { Request, Response } from 'express'

import { campgroundsRouter } from './campgrounds.routes'

const router = express.Router()

/**
 * @desc: Health check route
 * @endpoint: GET /api/v1/healthcheck
 */
router.get('/healthcheck', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Server is up and running' })
})

/**
 * @desc: Campgrounds routes
 * @endpoint: GET /api/v1/campgrounds
 */
router.use('/campgrounds', campgroundsRouter)

export { router }
