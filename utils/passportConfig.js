const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../model')

// Password Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false
  },
    (username, password, done) => {
        User.findOne({ username: username, password: password }).then((err, user) => {
            // This is how you handle error
            if (err){ 
                return done(err);
            }
            // When user is not found
            if (!user) {
                return done(null, false);
            }
            // When password is not correct
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }

            // When all things are good, we return the user
            return done(null, user);
        }).catch((error) => {
            return done(error, false)
        })
    }
)