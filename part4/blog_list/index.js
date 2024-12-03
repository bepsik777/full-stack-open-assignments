const { MONGO_URL, PORT } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./controllers/blogs')
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
app.use('/api/blogs/', router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
