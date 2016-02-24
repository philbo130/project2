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
	//find all accomplishments
	Accomp.find({}, function(err, accomp){
		 res.render('accomp/index.ejs', {
			accomp:accomp
		});
	});
});

//RENDERS USER ACCOMP PAGE
router.get('/:id', function(req, res){
    Accomp.findById(req.params.id, function(err, accomp) {
        res.render('accomp/show.ejs', { accomp: accomp} );      
    });
});


//CREATE
router.post('/', function(req, res){
	var newAccomp = new Accomp(req.body);
	newAccomp.save();
});

//UPDATE - ADD STICKER/ACCOMP TO USER - JOSH!!
router.post('/accomp/:id', function(req, res){
	console.log("the PUT request works");
	// User.findById(req.user.id, function(err, user){
	// 	console.log(user);
	// 	Accomp.findById(req.params.id, function(err, accomp){
	// 		user.accomp.push(accomp);
	// 		user.save(function(err, data){
	// 			console.log("data is " + data);
	// 			res.redirect('/user/:id')
	// 		});
	// 	});
	// });
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
	];

	Accomp.create(newAccomp, function(err) {
		  console.log("SEED: new accomplishments seeded!");
		  res.redirect('/accomp');
	});

});


module.exports = router;