//REQUIREMENTS
var mongoose = require('mongoose');
var accompSchema = require('./accomp').schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({

	username: {type:String, required:true, unique:true},
	email: String,
	password: String,
	accomp: [accompSchema]
	
});

userSchema.methods.hash = function() { 
	return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', userSchema);

module.exports= User;