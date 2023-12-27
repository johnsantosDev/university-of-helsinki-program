import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'

import config from './utils/config.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import notesRouter from './controllers/notes.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testRouter from './controllers/test.js'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app