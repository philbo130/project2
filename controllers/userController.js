//REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Accomp = require('../models/accomp.js');


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
        console.log("USER SHOW req.user: ", req.user);
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
    console.log('req.user: ', req.user);
    req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
    User.findById(req.params.id, function(err, user) {
        res.render('user/show.ejs', { user: user });
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

//ADD ACCOMP TO CHAMP CHART ("EARNED" ARRAY)
router.post('/:id/newaccomp', function(req, res){
    console.log("post request accessed");
    User.findById(req.user.id, function(err, user){
        Accomp.findById(req.body.accomp_id, function(err, useraccomp){
        // user.accomp.findById(req.params.id, function(err, useraccomp){
            console.log(useraccomp);
            user.earned.push(useraccomp);
            user.save(function(err, data){
                console.log("data is " + data);
                res.redirect('/user/:id')
            });
        });
    });
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
            earned: [
                {
                name: "sweetheart",
                descr: "was a total sweetheart!",
                img: "/img/heart.png",
                },
            ],
            accomp: [
            {
                name: "housework",
                descr: "helped with housework",
                img: "/img/housework.png",
            }, {
                name: "awesome",
                descr: "was completely awesome",
                img: "/img/star_sticker.png",
            }, {
                name: "being kind",
                descr: "went out of my way to be kind to someone",
                img: "/img/angel_sticker.png",
            }, {
                name: "helped mom & dad",
                descr: "helped mom and dad being asked",
                img: "/img/help_mom.png",
            }
        ]

    }];

    User.create(newUser, function(err) {
          console.log("SEED: new user seeded!");
          res.redirect('/user');
    });

});


module.exports = router;