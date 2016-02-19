var express = require('express');
var router = express.Router();
var Users = require('../models/users.js')

router.get('/', function(req, res){
	//find all users
	Users.find({}, function(err,users){
		res.render('users/index.ejs', {
			users:users
		});
	});
});

module.exports = router;