const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  name: String,
  author: String,
  url: String,
  like: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
