var User = require('../models/user');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	console.log('passport working');

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

   ///SIGNUP

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        emailField:'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email, create user

                var newUser = new User();

                // set the user's  credentials
                newUser.email = email;
                newUser.username= req.body.username,
                //newUser.password = newUser.generateHash(password);
                newUser.password = password;
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

};