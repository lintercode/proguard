const express = require('express')
const database = require('./utils/db')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const routes = require('./routes')

require('dotenv').config()
require('./utils/passportConfig')
const { LocalConfig } = require('./utils/config')
const port = LocalConfig.PORT || 5000

const app = express()

// executing the database(passport)
database()

// Middlewares for service request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(passport.initialize())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))

// Routes
app.use(routes)

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

app.listen(port, () => console.log('server started at ' + port))
