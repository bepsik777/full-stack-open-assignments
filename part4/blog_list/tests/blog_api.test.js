const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { default: mongoose } = require('mongoose')

const api = request(app)
let token
let testId

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const testUser = new User({
    name: 'test',
    username: 'test',
    passwordHash: 'test',
  })
  const savedTestUser = await testUser.save()
  token = jwt.sign(
    {
      id: savedTestUser.id,
      name: savedTestUser.name,
      username: savedTestUser.username,
    },
    process.env.SECRET
  )

  const blogs = helper.initialBlogs
    .map((blog) => {
      blog.user = savedTestUser._id
      return blog
    })
    .map((blog) => new Blog(blog))
  const arrayOfPromises = blogs.map((blog) => blog.save())
  await Promise.all(arrayOfPromises)
})

describe('fetching resources', () => {
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
})

describe('posting new resources to db', () => {
  test('return 401 when token is not provided', async () => {
    const testPost = {
      name: 'test',
      author: 'test',
      url: 'test.com',
      like: 1,
    }

    await api.post('/api/blogs/').send(testPost).expect(401)
  })
  test('can post new blogs to db', async () => {
    const testPost = {
      name: 'test',
      author: 'test',
      url: 'test.com',
      like: 1,
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send(testPost)
      .expect(201)

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

    const res = await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send(testPost)
      .expect(201)

    assert(res.body.hasOwnProperty('like'))
    assert.strictEqual(res.body.like, 0)
  })

  test('return 400 when url is missing', async () => {
    const testPost = {
      name: 'test',
      author: 'test',
      like: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testPost)
      .expect(400)
  })

  test('return 400 when name is missing', async () => {
    const testPost = {
      author: 'test',
      url: 'test.test',
      like: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testPost)
      .expect(400)
  })
})

describe('deleting resources from db', () => {
  test('returns 404 if resource does not exist', async () => {
    const fakeId = await helper.getFakeId()
    await api
      .delete(`/api/blogs/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('remove document if document with such id exists', async () => {
    const dbFromStart = await helper.getBlogsFromDB()
    const idOfFirst = dbFromStart[0].id
    await api
      .delete(`/api/blogs/${idOfFirst}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const dbFromEnd = await helper.getBlogsFromDB()
    const indexes = dbFromEnd.map((entry) => entry.id)
    assert(!indexes.includes(idOfFirst))
  })
})

describe('updating resources from db', () => {
  test('update the resource using PUT', async () => {
    const dbFromStart = await helper.getBlogsFromDB()
    const firtsEntry = dbFromStart[0]
    firtsEntry.like = 100000
    await api
      .put(`/api/blogs/${firtsEntry.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(firtsEntry)
      .expect(200)
    const dbFromEnd = await helper.getBlogsFromDB()
    assert.strictEqual(dbFromEnd[0].like, firtsEntry.like)
  })

  test('return 404 if resource to be updated does not exist', async () => {
    const fakeId = await helper.getFakeId()
    await api
      .put(`/api/blogs/${fakeId}`)
      .set('Authorization', `Bearer ${token}`).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
