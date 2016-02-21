var express = require('express');
var router = express.Router();
var Accomp = require('../models/accomp.js');
var mongoose = require('mongoose');

//INDEX

// //establish connection with accomp ejs page
// router.get('/', function(req, res){
// 	res.render('accomp/index.ejs')
// });

router.get('/', function(req, res){
	//find all accomplishments
	Accomp.find({}, function(err, data){
		res.render('accomp/index.ejs', {
			accomp:accomp
		});
	});
});

//CREATE



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