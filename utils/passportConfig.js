const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy = require("passport-twitter").Strategy
const { User } = require('../model')

// Password Local Strategy
module.exports = (passport)=>{
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
    ))


    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALL_BACK,
        includeEmail:true
      },
      (token, tokenSecret, profile, done) => {
    
            const twitterUser = new User({
                email : profile.emails[0].value,
                username : profile.displayName
            });    
            // /* save if new */
            User.findOne({email:twitterUser.email}, (err, user) =>{
                if(!user) {
                    twitterUser.save(function(err, twitterUser) {
                        if(err) {
                            return done(err)
                        }else{
                            done(null,twitterUser);
                        }
                    })
                } else {
                    done(null, user);
                }
            });
    
      }
    ));

    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session. 
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            done(err, user);
        });
    });

}