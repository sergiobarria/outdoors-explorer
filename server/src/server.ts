import * as http from 'http'

import chalk from 'chalk'

import { app } from './app'
import { logger } from '@utils/logger'

const PORT = process.env.PORT ?? 3000
const NODE_ENV = process.env.NODE_ENV ?? 'development'

let server: http.Server

const startServer = async (): Promise<void> => {
  server = http.createServer(app)

  try {
    server.listen(PORT, () => {
      logger.info(
        chalk.greenBright(
          `Server is running on port ${chalk.bold(PORT)} in ${chalk.bold(NODE_ENV)} mode`
        )
      )
    })
  } catch (error) {
    console.log(error)
  }
}

void startServer()
