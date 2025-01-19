const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV != 'test') {
    logger.info('method: ', req.method)
    logger.info('body: ', req.body)
    logger.info('path: ', req.path)
    logger.info('---')
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'Unknown' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'Malformated ID' })
  } else if (error.name === 'ValidationError') {
    res.status(400).send({ error: 'Wrong format' })
  } else if (error.name === 'PasswordToShort') {
    res
      .status(400)
      .send({ error: 'password must be at least 3 characters long' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const token = req.get('Authorization')
  if (token && token.startsWith('Bearer ')) {
    req.token = token.replace('Bearer ', '')
  } else {
    res.status(401).json({error: 'Authentication failed'})
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const payload = jwt.verify(req.token, process.env.SECRET)
  req.user = await User.findById(payload.id)
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
