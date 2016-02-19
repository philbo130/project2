var express = require('express');
var router = express.Router();
var Accomplish = require('../models/accomplish.js');

router.get('/', function(req, res){
	//find all accomplishments
	Accomplish.find({}, function(err, data){
		res.render('accomplish/index.ejs', {
			accomplish:accomplish
		});
	});
});





module.exports = router;