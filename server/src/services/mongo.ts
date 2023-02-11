import * as mongoose from 'mongoose'

import { logger } from '@/utils/logger'

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/outdoors-explorer'

export const mongoConnect = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false) // prevent deprecation warning from mongoose v7.0
    await mongoose.connect(MONGO_URI)

    logger.info(`MongoDB connected to: ${MONGO_URI}`)
  } catch (err: any) {
    logger.error(err.message)
    process.exit(1)
  }
}
