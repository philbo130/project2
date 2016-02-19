var mongoose = require('mongoose');

var accomplishSchema = mongoose.Schema({

	accomplish: String,
	image: String
});

var Accomplish = mongoose.model('Accomplish', accomplishSchema);

module.exports = Accomplish;