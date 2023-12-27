/* eslint-disable no-undef */
import supertest from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import app from '../app'
import User from '../models/user'

const api = supertest(app)

beforeEach(async () => {
  User.deleteMany({})
  const passwordHash = await bcrypt.hash('mypassword', 10)

  const user = new User({
    username: 'suraj',
    name: 'mishra suraj',
    passwordHash
  })

  await user.save()
})

describe('users creation', () => {
  test('invalid users are not created and returns a proper status code and message', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'suraj',
      name: 'simran',
      password: 'damm'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})

    expect(result.body.error).toBe('username must be unique')
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})