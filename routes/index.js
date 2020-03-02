
// const express = require('express')
const twitterAuthentication = require('../authentication/index')
const facebookAuthentication = require('../authentication/index')
const localRegistration = require('../authentication/index')

module.exports = (app) => {
  // Local login
  app.post('/create/user', localRegistration.localRegistration)

  // Twitter login
  app.get('/login/twitter', twitterAuthentication.twitterLogin)
  app.get('/oauth/callback', twitterAuthentication.twitterOauth,
    (req, res) => {
      res.redirect('/')
    }
  )

  // // Facebook login
  app.get('/auth/facebook', facebookAuthentication.facebookLogin)
  app.get('/auth/facebook/callback', facebookAuthentication.facebookOauth)
}
