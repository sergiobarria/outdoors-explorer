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

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   })
//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
//   console.log({ alice, bob })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
