import express from 'express'
import cors from 'cors'

import { morganMiddleware } from '@/middleware/morgan.middleware'

import { router } from '@/routes/router'

const app = express()

// Middlewares
app.use(express.json())
app.use(morganMiddleware)
app.use(cors())

// Routes
app.use('/api/v1', router)

export { app }
