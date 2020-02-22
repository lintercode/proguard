const auth = require('./auth')


module.exports = {
  logIn: auth.logIn,
  logOut: auth.logOut, 
  twitterAuthentication: { 
      twitterOauth: auth.twitterOauth, 
      twitterLogin: auth.twitterLogin}
}