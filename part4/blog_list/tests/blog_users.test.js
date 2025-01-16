const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'test', name: 'test', passwordHash: 'pwd' })
  await user.save()
})

describe('user creation and retrieval', () => {
  test("user can't be added when password is to short", async () => {
    const usersAtStart = await helper.getUsersFromDB()
    const newUser = {
      username: 'uzumaki',
      name: 'uzumaki',
      password: '12',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.getUsersFromDB()
    assert.deepEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
