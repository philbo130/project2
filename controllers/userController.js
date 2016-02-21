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

// router.get('/', function(req, res){
// 	//find all users
// 	User.find({}, function(err,users){
// 		res.render('user/index.ejs', {
// 			user:user
// 		});
// 	});
// });

// login
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/user' }), function(req, res) {
    // success redirect goes to show page
    res.redirect('/user/' + req.user.id);
});

// process the signup
router.post('/', passport.authenticate('local-signup', { 
	failureRedirect: '/user' }), function(req, res) {
    //success redirect goes to show page
    res.redirect('/user/' + req.user.id);
});

// //Show Page 
// // we will want this protected so you have to be logged in to visit
//  // we will use route middleware to verify this (the isLoggedIn function)
// router.get('/profile', isLoggedIn, function(req, res) {
//     res.render('user/show.ejs', {
//         user : user // get the user out of session and pass to template
//     });
// });

// //Logout
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// 	});
// };

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

module.exports = router;