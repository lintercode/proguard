
const express = require('express')
const twitterAuthentication = require('../authentication/auth')

//Twitter Login Router
module.exports = (app)=>{
    app.get('/login/twitter', twitterAuthentication.twitterLogin);
    
    app.get('/oauth/callback', twitterAuthentication.twitterOauth,
        (req, res) => {
            res.redirect('/')
        }
    );
}
