import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

const userRouter = express.Router()

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })

  if(existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  } else if(password === undefined) {
    return response.status(400).json({ error: 'password should be defined' })
  } else if(password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

export default userRouter