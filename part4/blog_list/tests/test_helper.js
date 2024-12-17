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

const getFakeId = async () => {
    const doc = {
        name: 'sad',
        author: 'fdsf',
        url: 'www.cam.ia',        
    }

    const blog = new Blog(doc)
    await blog.save()
    const retrieved = await Blog.findOne({name: doc.name})
    const fakeId = retrieved.id
    await Blog.findByIdAndDelete(fakeId)

    return fakeId
}

module.exports = {
    initialBlogs,
    getBlogsFromDB,
    getFakeId
}