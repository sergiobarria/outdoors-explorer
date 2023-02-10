import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

import { cities } from './data/cities'
import { campgroundNames } from './data/campgrounds'

const prisma = new PrismaClient()

const seedDB = async (): Promise<void> => {
  await prisma.campground.deleteMany({})

  const sample = (array: string[]): string =>
    array[Math.floor(Math.random() * array.length)]

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const title = sample(campgroundNames)

    await prisma.campground.create({
      data: {
        title,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        price
      }
    })

    console.log(`Created campground ${chalk.blueBright(title)}`)
  }
}

seedDB()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
  })
