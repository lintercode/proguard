const mongoose = require('mongoose')
const userSchema = require('./user')
const roleSchema = require('./role')
const claimSchema = require('./claim')

module.exports = {
  User: mongoose.model('User', userSchema),
  Role: mongoose.model('Role', roleSchema),
  Claim: mongoose.model('Claim', claimSchema)
}
