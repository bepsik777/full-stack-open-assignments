const cors = require('cors')
const router = require("express").Router()
const Blog = require('../models/blog')

router.get('/', async(req, res, next) => {   
    const result = await Blog.find({})
    res.status(200).json(result)
})

router.post('/', async (req, res, next) => {
    const blog = new Blog(req.body);
    const result = await blog.save()
    res.status(201).json(result)
})

module.exports = router
