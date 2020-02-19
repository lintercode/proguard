const authentication = require('./auth')

module.exports = {
  logIn: authentication.logIn,
  logOut: authentication.logOut,
  localRegistration: authentication.localRegistration
}
