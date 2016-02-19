var mongoose = require('mongoose');
var accomplishSchema = require('./accomplish').schema;

var userSchema = mongoose.Schema({

	username: {type:String, required:true, unique:true},
	password: String,
	accomplish: [accomplishSchema]
});

var User = mongoose.model('User', userSchema);

module.exports= User;