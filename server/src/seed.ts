// import * as mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'
import dotenv from 'dotenv'

import { cities } from './data/cities'
import { campgroundNames } from './data/campgrounds'
import { descriptions } from './data/descriptions'
// import { CampgroundModel } from './models/campground.model'

dotenv.config()

// const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/outdoors-explorer'

const prisma = new PrismaClient()
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log(`MongoDB connected to: ${MONGO_URI}`)
//   })
//   .catch((err: any) => {
//     console.log(err.message)
//     process.exit(1)
//   })

const seedDB = async (): Promise<void> => {
  // await CampgroundModel.deleteMany({})
  await prisma.campground.deleteMany({})

  const sample = (array: string[]): string =>
    array[Math.floor(Math.random() * array.length)]

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const title = sample(campgroundNames)

    // await CampgroundModel.create({
    //   title,
    //   description: sample(descriptions),
    //   location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //   price,
    //   image: 'https://source.unsplash.com/collection/483251'
    // })

    await prisma.campground.create({
      data: {
        title,
        description: sample(descriptions),
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        price,
        image: 'https://source.unsplash.com/collection/483251'
      }
    })

    console.log(`Created campground ${chalk.blueBright(title)}`)
  }

  process.exit(0)
}

void seedDB()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.log(err)
    await prisma.$disconnect()
    process.exit(1)
  })
