require('express-async-errors')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

router.get('/', async (req, res, next) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(result)
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const result = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1,
  })
  result
    ? res.status(200).json(result)
    : res.status(404).json('resource does not exist')
})

router.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
  const body = req.body
  if (!body.likes) {
    body.like = 0
  }
  body.user = req.user._id.toString()
  const blog = new Blog(body)
  const savedBlog = await blog.save()
  req.user.blogPosts = req.user.blogPosts.concat(savedBlog._id)
  await req.user.save()
  res.status(201).json(savedBlog)
})

router.delete('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
  const id = req.params.id
  const result = await Blog.findById(id)

  if (result === null) {
    res.status(404).send('Resource does not exist')
  } else if (result.user.toString() !== req.user.id) {
    res
      .status(401)
      .json({ error: "you don't have permission to delete this resource" })
  } else {
    const result = await Blog.findByIdAndDelete(id)
    res.status(204).send(result)
  }
})

router.put('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
  const id = req.params.id
  const newResource = req.body
  const result = await Blog.findByIdAndUpdate(id, newResource, { new: true })

  if (result === null) {
    res.status(404).send('Resource does not exist')
  } else if (req.user.id !== result.user.toString()) {
    res
      .status(401)
      .json({ error: "You don't have permission to modify this resource" })
  } else {
    res.status(200).send(result)
  }
})

module.exports = router
