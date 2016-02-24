//REQUIREMENTS

var mongoose = require('mongoose');
var accompSchema = require('./accomp').schema;
var bcrypt = require('bcrypt-nodejs');

//USER SCHEMA

var userSchema = mongoose.Schema({

	username: {type:String, required:true, unique:true},
	email: String,
	password: String,
	accomp: [accompSchema],
	added: [accompSchema]
	
});

//METHODS

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports= User;