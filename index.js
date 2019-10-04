const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//console.developers.google.com
//clientID and clientSecert are at the keys.js file
passport.use(new GoogleStrategy ({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, accessToken => {
    console.log(accessToken);
  })
);

//route for authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));


const PORT = process.env.PORT || 5000; //environment variables, pass runtime configuration of the port. If doesn't exist than port = 5000 (for development environment)
app.listen(PORT); //really node is listenning on this port
