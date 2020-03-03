
// const express = require('express')
const auth = require('../authentication/index')
const express = require('express')
router = express.Router()

  // Local login
  router.post('/create/user', auth.localRegistration)

  // Twitter login
  router.get('/login/twitter', auth.twitterAuthentication.twitterLogin)
  router.get('/oauth/callback', auth.twitterAuthentication.twitterOauth,
    (req, res) => {
      res.redirect('/')
    }
  )

  // // Facebook login
  router.get('/auth/facebook', auth.facebookAuthentication.facebookLogin)
  router.get('/auth/facebook/callback', auth.facebookAuthentication.facebookOauth)


module.exports = router
