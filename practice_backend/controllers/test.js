import express from 'express'

import Note from '../models/note.js'
import User from '../models/user.js'

const testRouter = express.Router()

testRouter.post('/reset', async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMany({})
  
    response.status(204).end()
  })
  
export default testRouter
