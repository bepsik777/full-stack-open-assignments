const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLenght: 3,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    blogPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, returnedDoc) => {
        returnedDoc.id = returnedDoc._id.toString()
        delete returnedDoc._id
        delete returnedDoc.__v
      },
    },
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
