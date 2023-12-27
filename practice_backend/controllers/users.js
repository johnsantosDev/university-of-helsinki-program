import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('notes', {content: 1, date: 1})
        response.json(users)
    } catch (exception) {
        next(exception)
    }
})

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    const existingUser = await User.findOne({username})

    if(existingUser) {
        return response.status(400).json({error: 'username must be unique'}) 
    } 

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await newUser.save()
        console.log('saved user:', savedUser)
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

export default userRouter