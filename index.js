const express = require('express')
const bodyparser = require('body-parser')
const database = require('./utils/db')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
// executing the database
database()

// Middlewares for service request
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())

// Routes

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


passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	user.findById(id, function(err, user) {
		done(err, user);
	});
});

app.listen(port, () => console.log('server started'))
