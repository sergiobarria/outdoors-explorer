import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import { prisma } from '@services/prisma'

const getRecords = async (): Promise<any> => {
  return await prisma.campground.findMany()
}

/**
 * @desc: Get all campgrounds
 * @endpoint: GET /api/v1/campgrounds
 * @access: Public
 */
export const getCampgrounds = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const campgrounds = await prisma.campground.findMany()
    const campgrounds = await getRecords()

    res.status(httpStatus.OK).json({
      success: true,
      count: campgrounds.length,
      data: { campgrounds }
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
      data: { campground }
    })
  }
)
