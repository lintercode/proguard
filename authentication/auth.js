const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../utils/passportConfig')(passport)

module.exports = {
  twitterLogin: passport.authenticate('twitter'),
  twitterOauth: passport.authenticate('twitter', { failureRedirect: '/login' }),

  logIn: async (req, res, next) => {
    passport.authenticate('local', { failWithError: true }),
    (req, res, next) => {
   
      /*
          you can do anything here (log in is successful). This is a safe haven, redirect, render, or do what ever you want. You own it.
      */
      res.redirect('/succesUrl')
    }
  },

  //Log user out
  logOut: async (req, res, next) => {
    try {
      //clear session
    } catch (error) {
      next(error)
    }
  }

}