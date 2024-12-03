const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('method: ', req.method)
  logger.info('body: ', req.body)
  logger.info('path: ', req.path)
  logger.info('---')
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
  }

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
