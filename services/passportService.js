const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done ) => {
    done(null, user.id); //this user.id is the id record in mongodb
});

passport.deserializeUser( (id, done) => {
    User.findById(id)
        .then(user => {
          done(null, user);
        });
});

//console.developers.google.com
//clientID and clientSecert are at the keys.js file
passport.use(new GoogleStrategy ({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true //this tells googleStrategy that it is ok to go through a proxy (as we are using manged service by heroku), so it can keep the https://
  },
  async (accessToken, refreshToken, profile, done) =>
   {
        const existingUser = await User.findOne({ googleID: profile.id }); //this is not a synchronized action, mongoose returens a promise (then)
        if(existingUser){
            //we already have a record with the given profile ID
            return done(null, existingUser);
        }
        //we don't have a user record with this ID, make a new recored
        const user = await new User({ googleID: profile.id }).save(); //save() - another synchronized action to the DB, have to add the .then statement
        done(null, user);
    })
);
