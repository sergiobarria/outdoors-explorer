import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import { CampgroundModel } from '@/models/campground.model'
import {
  GetCampgroundType,
  CreateCampgroundType,
  UpdateCampgroundType,
  DeleteCampgroundType
} from '@/schemas/campground.schema'

/**
 * @desc: Get all campgrounds
 * @endpoint: GET /api/v1/campgrounds
 * @access: Public
 */
export const getCampgrounds = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await CampgroundModel.find({}).select('-__v')
    // const campgrounds = await prisma.campground.findMany()

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
  async (req: Request<GetCampgroundType>, res: Response, next: NextFunction) => {
    const { id } = req.params

    const campground = await CampgroundModel.findById(id).select('-__v')

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
export const createCampground = asyncHandler(
  async (req: Request<unknown, unknown, CreateCampgroundType>, res: Response) => {
    const { body } = req

    const campground = await CampgroundModel.create(body)
    // const campground = await prisma.campground.create({
    //   data: req.body
    // })

    res.status(httpStatus.CREATED).json({
      success: true,
      data: campground
    })
  }
)

/**
 * @desc: Update campground
 * @endpoint: PUT /api/v1/campgrounds/:id
 * @access: Public
 */
export const updateCampground = asyncHandler(
  async (
    req: Request<UpdateCampgroundType['params'], unknown, UpdateCampgroundType['body']>,
    res: Response
  ) => {
    const { id } = req.params
    const { body } = req

    const campground = await CampgroundModel.findByIdAndUpdate(id, body, {
      new: true
    }).select('-__v')

    res.status(httpStatus.OK).json({
      success: true,
      data: campground
    })
  }
)

/**
 * @desc: Delete campground
 * @endpoint: DELETE /api/v1/campgrounds/:id
 * @access: Public
 */
export const deleteCampground = asyncHandler(
  async (req: Request<DeleteCampgroundType>, res: Response) => {
    const { id } = req.params

    await CampgroundModel.findByIdAndDelete(id)

    res.status(httpStatus.NO_CONTENT).json({
      success: true,
      data: {}
    })
  }
)
