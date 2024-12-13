const express  = require('express')
const router = express.Router()
const User = require('../models/userSchema')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

router.post('/register', async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    // Send the token and user details in a JSON response
    res.status(StatusCodes.CREATED).json({
      message: `Hello ${user.name}, Welcome to CHAMCHAM!`,
      token: token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Registration failed' });
  }
});


router.post('/login' , async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.send('Invalid Credentials')
    throw new UnauthenticatedError('User does not exist. Register and try again')   
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.send('Invalid Credentials')
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({name: user.name, token })
})

module.exports = router