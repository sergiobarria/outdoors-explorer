import express from 'express'

import { morganMiddleware } from '@middleware/morgan.middleware'

import { router } from '@routes/router'

const app = express()

// Middlewares
app.use(express.json())
app.use(morganMiddleware)

// Routes
app.use('/api/v1', router)

export { app }
