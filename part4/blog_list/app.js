const { MONGO_URL, PORT } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const deleteAllRouter = require('./controllers/delete_all')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const app = express()


try {
  mongoose.connect(MONGO_URL)
} catch (e) {
  logger.error(e.message)
}

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/delete-all', deleteAllRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app