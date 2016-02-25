var express = require('express');
var router = express.Router();
var Accomp = require('../models/accomp.js');
var mongoose = require('mongoose');
var User = require('../models/user.js');


//INDEX

//establish connection with accomp ejs page
// router.get('/', function(req, res){
// 	res.render('accomp/index.ejs')
// });

router.get('/json', function(req, res) {
    Accomp.find(function(err, accomp) {
        res.send(accomp);
    });
});

//SENDING ACCOMP DATA TO RENDER IN EJS
router.get('/', function(req, res){

	console.log('Accomps req.user: ', req.user);
	//find all accomplishments
	Accomp.find({}, function(err, accomp){
		 res.render('accomp/index.ejs', {
			accomp:accomp
		});
	});
});

//RENDERS USER ACCOMP PAGE
router.get('/:id', function(req, res){
	console.log('Accomps SHOW req.user: ', req.user);
    Accomp.findById(req.params.id, function(err, accomp) {
        res.render('accomp/show.ejs', { accomp: accomp } );      
    });
});


//CREATE
router.post('/', function(req, res){
	var newAccomp = new Accomp(req.body);
	newAccomp.save();
});

//UPDATE - ADD STICKER/ACCOMP TO USER - THANKS JOSH!!
router.post('/accomp/:id', function(req, res){
	// console.log('Accomps Add Sticker, req.user: ', req.user);
	// if (req.isAuthenticated()) {
	// 	userid = req.user.id
	// } else {
	// 	res.redirect('/accomp/json');
	// }
	// console.log('USER ID: ', userid);
	// res.redirect('/');

	User.findById(req.user.id, function(err, user){
	//User.findById(req.params.user_id, function(err, user){
	console.log(user);
		Accomp.findById(req.params.id, function(err, data){
			user.accomp.push(data);
			user.save(function(err, data){
				console.log("data is " + data);
				res.redirect('/user/' + req.user.id)
			});
		});
	});
});

//DELETE
router.delete('/id:', function(req, res){
	Accomp.findByIdAndRemove(req.params.id, function(err, accomp){
		res.redirect('/accomp');
	});
});

//SEED DATA

router.get('/seed/newaccomp', function(req, res) {

	var newAccomp = [
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
			name: "mom",
			descr: "helped mom and dad",
    	    img: "/img/help_mom.png",
	  	}, {
			name: "sweetheart",
			descr: "was a total sweetheart",
	        img: "/img/heart.png",
		},
	];

	Accomp.create(newAccomp, function(err) {
		  console.log("SEED: new accomplishments seeded!");
		  res.redirect('/accomp');
	});

});


module.exports = router;