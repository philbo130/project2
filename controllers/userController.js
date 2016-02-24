//REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Accomp = require('../models/accomp.js');



//CONNECT WITH EJS FILE, show the signup at user welcome page
// router.get('/', function(req, res){
// 	res.render('user/index.ejs')
// });

// //JSON FOR TESTING

router.get('/json', function(req, res) {
    User.find(function(err, user) {
        res.send(user);
    });
});

router.get('/:id/json', function(req, res){
    User.findById(req.params.id, function(err, user) {
        res.send(user);     
    });
});

//LOGOUT

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/user');
});

//RENDER ALL USERS TO SHOW PAGE
router.get('/', function(req, res){
    //find all users
    User.find({}, function(err, user){
         res.render('user/index.ejs', {user:user});
    });
});

//RENDERS USER SHOW PAGE
router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user) {
        console.log("This is the user: ", user);
        res.render('user/show.ejs', { user: user} );      
    })
});

//RENDERS USER ACCOMP PAGE
router.get('/:id/accomp', function(req, res){
    User.findById(req.params.id, function(err, user) {
        res.render('accomp/show.ejs', { user: user} );      
    });
});

//USER RIGHTS AUTHETICATION
// we will want this protected so you have to be logged in to visit
 // we will use route middleware to verify this (the isLoggedIn function)
router.get('/:id', isLoggedIn, function(req, res) {
    req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
    User.findById(req.params.id, function(err, user) {
        res.render('user/show.ejs', { user: user });
    });
});

// saves a new accomplishment to the accomp model and the User's accomp list
router.post('/:id/newAccomp', function(req, res) {
 User.findById(req.params.id, function(err, user) {
     var accomp = new Accomp(req.body);
     accomp.save(function(err, accomp) {
         user.accomp.push(accomp);
         user.save(function(err, user) {
             res.redirect('/user/' + req.params.id);
         });         
     });
 });
});

// SIGNUP

router.post('/', passport.authenticate('local-signup', {
    failureRedirect: '/user/json' }), function(req, res) {
    //success redirect goes to show page
    console.log('signed up');
    res.redirect('/user/' + req.user.id);
});

// LOGIN

router.post('/login', passport.authenticate('local-login', { 
    failureRedirect: '/user/json' }), function(req, res) {
    // success redirect goes to show page
    console.log('loggin in');
    res.redirect('/user/' + req.user.id);
});

// DELETE

router.delete('/:id', function(req, res){
    console.log("delete function");
    User.findByIdAndRemove(req.params.id, function(err, user) {
        console.log('deleting');
        res.redirect('/user');
    });
});

//ROUTE MIDDLEWARE TO MAKE SURE USER IS LOGGED IN

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        console.log('middleware - isLoggedIn function');
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};

//SEED DATA

router.get('/seed/newuser', function(req, res) {

    var newUser = [
        {   
            username: "Amelia",
            email: "paukao@gmail.com",
            password: 1234,
            earned: [],
            accomp: [
            {
            name: "housework",
            descr: "helped with housework",
            img: "mop icon",
            }, {
            name: "picked up toys",
            descr: "put all of my toys away",
            img: "tbd icon",
            }, {
            name: "being kind",
            descr: "went out of my way to be kind to someone",
            img: "angel wings icon",
            }, {
            name: "helping mommy",
            descr: "helped mommy without being asked",
            img: "mom icon",
            }
        ]

    }];

    User.create(newUser, function(err) {
          console.log("SEED: new user seeded!");
          res.redirect('/user');
    });

});


module.exports = router;