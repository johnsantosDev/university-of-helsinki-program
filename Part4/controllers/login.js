import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  console.log('user', user)
  const passwordMatch = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordMatch)) {
    return response.status(401).json({
      error: 'username or password invalid'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
  console.log('token: ', token)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })

})

export default loginRouter