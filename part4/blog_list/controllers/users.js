require('express-async-errors')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', async (req, res, next) => {
  const allUsers = await User.find({}).populate('blogPosts', {name: 1, author: 1})
  res.status(200).send(allUsers)
})

router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if (password.length < 3) {
    res.status(400).send({error: 'password is too short'})
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  res.status(200).send(savedUser)
})

module.exports = router
