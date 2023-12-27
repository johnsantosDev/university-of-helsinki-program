/* eslint-disable no-undef */
import supertest from 'supertest'
import mongoose from 'mongoose'

import app from '../app'
import blogs from '../utils/data'
import Blog from '../models/blog'
import User from '../models/user'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  let blog = new Blog(blogs[0])
  await blog.save()
  blog = new Blog(blogs[1])
  await blog.save()

  await User.deleteMany()
  let user = new User({ username: 'sahas', password: 'mypassword' })
  await user.save()
})

describe('viewing blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('all blogs are returned', async() => {
    const response = await Blog.find({})
    expect(response).toHaveLength(2)
  })

  test('property id should be defined', async () => {
    const response = await Blog.find({})
    const firstBlog = response[0]
    console.log(firstBlog)
    expect(firstBlog.id).toBeDefined()
  })

  test('blog can be added', async () => {
    const newBlog = {
      title: 'an old blog',
      author: 'suraj mishra',
      url: 'www.surajmishra.com',
      likes: 500
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaGFzIiwiaWQiOiI2MzdkMjNlYjM0ZGY2Mzg5OGZiNjRiMDQiLCJpYXQiOjE2NjkxNDczNzEsImV4cCI6MTY2OTE1MDk3MX0.hDVkokCWIJJEt3R8spv5l7616k2QBT59hMSHHzj5F1g'
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await Blog.find({})
    const titles = response.map(blog => blog.title)

    expect(response).toHaveLength(21)
    expect(titles).toContainEqual('an old blog')
  })

  test('returns with proper status code and message if token not provided', async () => {
    const newBlog = {
      title: 'an old blog',
      author: 'suraj mishra',
      url: 'www.surajmishra.com',
      likes: 500
    }

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(401)

    expect(response.body.error).toBe('Unauthorized')
  })

  test('blog without likes should return 0', async () => {
    const newBlog = {
      title: 'suraj blog',
      author: 'suraj mishra',
      url: 'fjkdasfhdsa'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)

    const response = await Blog.find({})
    expect(response[2].likes).toBe(0)
  })

  test('should return status code 400 if title or url missing', async () => {
    const newBlog = {
      title: 'good title',
      author: 'mishra'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('testing with delete functionality', () => {
  test('should delete a blog with valid id and return status code 204', async () => {
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    const authors = blogsAtEnd.map(blog => blog.author)

    expect(blogsAtEnd).toHaveLength(1)
    expect(authors).not.toContainEqual('Michael Chan')
  })
})

describe('testing with updating blogs', () => {
  test('should update blog with valid id', async () => {
    const blogToUpdate = blogs[0]

    const blog = {
      likes: 200
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blog)
      .expect(200)

    console.log(updatedBlog.body)
    expect(updatedBlog.body.likes).toBe(blog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
