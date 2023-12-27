import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response, next) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordMatch = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if(!(user && passwordMatch)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

    console.log('token: ', token)

    response
        .status(200)
        .send({token, username: user.username, name: user.name})
})

export default loginRouter