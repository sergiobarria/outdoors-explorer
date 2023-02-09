import express from 'express'

import { morganMiddleware } from '@middleware/morgan.middleware'

const app = express()

// Middlewares
app.use(express.json())
app.use(morganMiddleware)

export { app }
