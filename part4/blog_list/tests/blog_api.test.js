const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { default: mongoose } = require('mongoose')

const api = request(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const arrayOfPromises = blogs.map((blog) => blog.save())
  await Promise.all(arrayOfPromises)
})

test('get all blogs', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(helper.initialBlogs.length, res.body.length)
})

test('return id instead of _id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  res.body.forEach((blog) => {
    assert(!blog._id)
    assert(blog.id)
  })
})

test('can post new blogs to db', async () => {
  const testPost = {
    name: 'test',
    author: 'test',
    url: 'test.com',
    like: 1,
  }

  await api.post('/api/blogs/').send(testPost).expect(201)

  const blogsAtEnd = await helper.getBlogsFromDB()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const names = blogsAtEnd.map((blog) => blog.name)
  assert(names.includes(testPost.name))
})

test('likes default to 0 when missing in blog', async () => {
  const testPost = {
    name: 'test',
    author: 'test',
    url: 'test.com',
  }

  const res = await api.post('/api/blogs/').send(testPost).expect(201)

  assert(res.body.hasOwnProperty('like'))
  assert.strictEqual(res.body.like, 0)
})

test('return 400 when url is missing', async () => {
  const testPost = {
    name: 'test',
    author: 'test',
    like: 10,
  }

  const res = await api.post('/api/blogs').send(testPost).expect(400)
})

test('return 400 when name is missing', async () => {
  const testPost = {
    author: 'test',
    url: 'test.test',
    like: 10,
  }

  const res = await api.post('/api/blogs').send(testPost).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
