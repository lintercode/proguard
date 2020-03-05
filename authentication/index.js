const auth = require('./auth')

module.exports = {
  // Local Authentication
  logIn: auth.logIn,
  logOut: auth.logOut,
  localRegistration: auth.localRegistration,

  // Twitter Authentication
  twitterAuthentication: {
    twitterOauth: auth.twitterOauth,
    twitterLogin: auth.twitterLogin
  },

  // Facebook Authenticaton
  facebookAuthentication: {
    facebookOauth: auth.facebookOauth,
    facebookLogin: auth.facebookLogin
  }
}
