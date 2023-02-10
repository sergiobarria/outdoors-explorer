import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import { prisma } from '@/services/prisma'

/**
 * @desc: Get all campgrounds
 * @endpoint: GET /api/v1/campgrounds
 * @access: Public
 */
export const getCampgrounds = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await prisma.campground.findMany()

    res.status(httpStatus.OK).json({
      success: true,
      count: campgrounds.length,
      data: campgrounds
    })
  }
)

/**
 * @desc: Get single campground
 * @endpoint: GET /api/v1/campgrounds/:id
 * @access: Public
 */
export const getCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const campground = await prisma.campground.findUnique({
      where: { id }
    })

    // if (!campground) {
    //   return next(new Error('Campground not found'))
    // }

    res.status(httpStatus.OK).json({
      success: true,
      data: campground
    })
  }
)

/**
 * @desc: Create campground
 * @endpoint: POST /api/v1/campgrounds
 * @access: Public
 */
export const createCampground = asyncHandler(async (req: Request, res: Response) => {
  const campground = await prisma.campground.create({
    data: req.body
  })

  res.status(httpStatus.CREATED).json({
    success: true,
    data: campground
  })
})

/**
 * @desc: Update campground
 * @endpoint: PUT /api/v1/campgrounds/:id
 * @access: Public
 */
export const updateCampground = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const campground = await prisma.campground.update({
    where: { id },
    data: req.body
  })

  res.status(httpStatus.OK).json({
    success: true,
    data: campground
  })
})

/**
 * @desc: Delete campground
 * @endpoint: DELETE /api/v1/campgrounds/:id
 * @access: Public
 */
export const deleteCampground = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.campground.delete({
    where: { id }
  })

  res.status(httpStatus.NO_CONTENT).json({
    success: true,
    data: {}
  })
})
