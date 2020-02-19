// const express = require('express')
// const bcrypt = require('bcryptjs')
const { User } = require('../model')
const { encryptPassword } = require('../utils/helper')
// const passport = require('passport')
// require('../utils/passportConfig')(passport)

module.exports = {
  // logIn: async (req, res, next) => {
  //   passport.authenticate('local', { failWithError: true }),
  //   (req, res, next) => {
  //     /*
  //         you can do anything here (log in is successful). This is a safe haven, redirect, render, or do what ever you want. You own it.
  //     */
  //     res.redirect('/succesUrl')
  //   }
  // },

  // Log user out
  logOut: async (req, res, next) => {
    try {
      // clear session
    } catch (error) {
      next(error)
    }
  },

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
