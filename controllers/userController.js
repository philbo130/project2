//REQUIREMENTS
var express = require('express');
var router = express.Router();
var Users = require('../models/user.js');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');


//connect with ejs file, show the signup at user welcome page
router.get('/', function(req, res){
	res.render('user/index.ejs')
});

//show page
router.get('/:id', function(req, res){
	res.render('user/show.ejs')
});

// router.get('/', function(req, res){
// 	//find all users
// 	User.find({}, function(err,users){
// 		res.render('user/index.ejs', {
// 			user:user
// 		});
// 	});
// });


// Login

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/user' }), function(req, res) {
    // success redirect goes to show page
    res.redirect('/user/' + req.user.id);
    console.log('loggin in');
});


// Signup

router.post('/', passport.authenticate('local-signup', { 
	failureRedirect: '/user' }), function(req, res) {
    //success redirect goes to show page
    res.redirect('/user/' + req.user.id);
    console.log('signed up');
});

//Show Page 

// we will want this protected so you have to be logged in to visit
 // we will use route middleware to verify this (the isLoggedIn function)
router.get('/:id', isLoggedIn, function(req, res) {
    req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		User.findById(req.params.id, function(err, user) {
			res.render('user/show.ejs', { user: user });
	});
});

//DON'T NEED THIS YET 
// // saves a new accomplishment to the accomp model and the User's accomp list
// router.post('/:id/newAccomp', function(req, res) {
// 	User.findById(req.params.id, function(err, user) {
// 		var accomp = new Accomp(req.body);
// 		accomp.save(function(err, accomp) {
// 			user.accomp.push(accomp);
// 			user.save(function(err, user) {
// 				res.redirect('/user/' + req.params.id);
// 			});			
// 		});
// 	});
// });

//Logout

router.get('/logout', function(req, res) {
    req.logout();
    // console.log('logged out');
    res.redirect('/');
});


// route middleware to make sure a user is logged in

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    	console.log('middleware - isLoggedIn function');
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;