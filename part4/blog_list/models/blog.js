const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: String,
    url: { type: String, required: true },
    like: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      transform: (dec, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
