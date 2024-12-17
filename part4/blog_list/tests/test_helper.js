const Blog = require('../models/blog')

const initialBlogs = [
    {
        name: 'syria',
        author: 'abdullah',
        url: 'www.costam.syria',
        like: 10
    },
    {
        name: 'jadro',
        author: 'dr. zeppelin',
        url: 'www.prawdziwanauka.nauka',
        like: 0
    }
]

const getBlogsFromDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    getBlogsFromDB
}