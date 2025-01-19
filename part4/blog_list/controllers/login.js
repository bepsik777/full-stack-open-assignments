const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordIsCorrect = user
    ? bcrypt.compare(password, user.passwordHash)
    : false

  if (!(user && passwordIsCorrect)) {
    res.status(401).send({ error: 'username or password are incorrect' })
  }

  const token = jwt.sign(
    { username: user.username, name: user.name, id: user.id },
    process.env.SECRET
  )

  res.status(200).json({token, username: user.username, name: user.name})
})


module.exports = router