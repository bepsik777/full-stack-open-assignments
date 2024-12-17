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

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await Blog.findByIdAndDelete(id)
    
    result == null ? res.status(404).send('Resource does not exist') : res.status(204)
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const newResource = req.body
    const result = await Blog.findByIdAndUpdate(id, newResource, {new: true})

    result == null ? res.status(404).send('Resource does not exist') : res.status(200).send(result)
})

module.exports = router
