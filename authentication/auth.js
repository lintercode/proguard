// const express = require('express')
// const bcrypt = require('bcryptjs')
const { User } = require('../model')
const { encryptPassword } = require('../utils/helper')
const passport = require('passport')
require('../utils/passportConfig')

module.exports = {
  twitterLogin: passport.authenticate('twitter'),
  twitterOauth: passport.authenticate('twitter', {
     failureRedirect: '/login' 
    }),
  facebookLogin: passport.authenticate('facebook', { scope: ['email'] }),
  facebookOauth: passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }),


  localRegistration: async (req, res, next) => {
    try {
      const { body } = req
      const { email } = body

      // Checks if user already exist in the database
      const data = await User.findOne({ email })
      if (data) {
        return res.status(401).json({
          data: {
            message: 'User already exist, please login or use forget password'
          }
        })
      }
      // Perform the the hashing the password and saving the user
      const user = new User(body)
      console.log(user)
      const { password } = user
      const hashedPassword = await encryptPassword(password)
      body.password = hashedPassword
      await user.save()

      res.status(201).json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }
}

// Protects routes that requires logged access
const loggInRequired = async (req, res, next)=>{

  // Assumming the email is in the session
  const email = req.session.email
  const data = await User.findOne({ email })
  if (data) {
      next()
  } else { 
      res.redirect("/login")
  }
});





