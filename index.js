const express = require('express')
const passport = require('passport')
const database = require('./utils/db')
const { LocalConfig } = require('./config/config')
const cors = require('cors')
const { localRegistration } = require('./authentication')
require('./utils/passportConfig')
const app = express()
const port = LocalConfig.PORT
// executing the database
database()

// Middlewares for service requestUnknown authentication strategy \"facebook\""
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.post('/create/user', localRegistration)
app.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)
// middleware for handling file not found error
app.use((req, res, next) => {
  const err = new Error('Request not found')
  res.status(404).json({ error: err })
  next(err)
})

// middleware for handling all errors
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  res.status(status).json({ error: { message: error.message } })
})

app.listen(port, () => console.log('server started'))
