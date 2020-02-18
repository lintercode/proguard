const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../../utils/passportConfig')(passport)

const router = express.Router()


// login with local strategy 
router.post('/login',
    // you can decide to use `failWithError: true` instead so you can display errors
    passport.authenticate('local', { failureRedirect: '/error' }),
        (req, res) =>{
            /*
                you can do anything here (log in is successful). This is a safe haven, redirect, render, or do what ever you want. You own it.
            */
            res.redirect('/succesUrl');
        }

    //Add other strategies here
)