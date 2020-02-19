const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

// Function for encrypting the password before saving
const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(12)
  const hashedPass = await bcrypt.hash(password, salt)
  return hashedPass
}

// Function for decrypting hashed password and compare for login
const decryptPassword = async (password, hashedPass) => {
  const operationResult = await bcrypt.compare(password, hashedPass)
  return operationResult
}

// Function for Generation token
const genToken = async id => {
  const token = await jwt.sign({ _id: id }, process.env.SECRET)
  return token
}

// Function that verifies Token
const verifyToken = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    return res
      .status(401)
      .json({ error: { message: 'please log in to perform this action' } })
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.SECRET)

    if (!verifiedToken._id) {
      return res
        .status(401)
        .json({
          error: {
            message: 'Invalid Token, please login to perform this action'
          }
        })
    }

    return next(verifiedToken)
  } catch (error) {
    next(error)
  }
}

// Function for checking access level
const checkAccessLevel = accessKey => (verifiedToken, req, res, next) => {
  try {
    const user = User.findById({ _id: verifiedToken._id })
      .populate('Role')
      .populate('claim')
    const access = user.access_level.map(access => access === accessKey)
    if (!access) {
      return res.status(401).json({
        error: { message: 'You are not authorize to perform this action' }
      })
    }
    return next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  encryptPassword,
  decryptPassword,
  genToken,
  verifyToken,
  checkAccessLevel
}
