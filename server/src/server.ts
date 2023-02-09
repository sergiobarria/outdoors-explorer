import * as http from 'http'

import chalk from 'chalk'

import { app } from './app'
import { logger } from '@utils/logger'
import { prisma } from '@services/prisma'

const PORT = process.env.PORT ?? 3000
const NODE_ENV = process.env.NODE_ENV ?? 'development'

let server: http.Server

const startServer = async (): Promise<void> => {
  server = http.createServer(app)

  await prisma.$connect()
  logger.info(chalk.blueBright('Connected to database'))

  try {
    server.listen(PORT, () => {
      logger.info(
        chalk.greenBright(
          `Server is running on port ${chalk.bold(PORT)} in ${chalk.bold(NODE_ENV)} mode`
        )
      )
    })
  } catch (error) {
    logger.error(chalk.redBright(error))
    process.exit(1)
  }
}

void startServer()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    logger.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
