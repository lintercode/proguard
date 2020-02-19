const { User } = require('../model')
const { encryptPassword } = require('../helper/helper')

const registration = async (req, res, next) => {
  try {
    const { body } = req
    const { email, password } = body

    // Checks if user already exist in the database
    const data = await User.findOne({ email })
    if (data) {
      return res.status(401).json({ data: { message: 'User already exist, please login or use forget password' } })
    }

    // Perform the the hashing the password and saving the user
    const hashedPassword = await encryptPassword(password)
    body.password = hashedPassword
    const user = new User(body)
    await user.save()

    res.status(201).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

module.exports = registration
