/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'

import logger from './logger.js'

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('*******************************')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ eror: 'Unknown endpoint!' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {
    response.status(400).send({ error: 'Malformatted id' })
  } else if(error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  }

  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  request.token = token
  next()
}

const userExtractor = (request, response, next) => {
  const token = request.token

  if(!token) {
    return response.status(401).send({ error: 'Unauthorized' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log('token from user extractor: ', decodedToken)
  request.user = decodedToken
  next()
}

export default {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}