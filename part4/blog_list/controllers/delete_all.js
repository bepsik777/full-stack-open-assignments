const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.delete('/:type', async (req, res) => {
    const resourceType = req.params.type
    if (resourceType === 'users') {
        await User.deleteMany({})
    } else if (resourceType === 'blogs') {
        await Blog.deleteMany({})
    }

    res.status(204).json(`all ${resourceType} have been deleted`)
})

module.exports = router