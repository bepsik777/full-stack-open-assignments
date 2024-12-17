require('express-async-errors')
const cors = require('cors')
const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res, next) => {
  const result = await Blog.find({})
  res.status(200).json(result)
})

router.post('/', async (req, res, next) => {
  const reqBody = req.body
  if (!reqBody.likes) {
    reqBody.like = 0
  }
  const blog = new Blog(reqBody)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = router
