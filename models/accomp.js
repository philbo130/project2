var mongoose = require('mongoose');

var accompSchema = mongoose.Schema({

	name: String,
	descr: String,
	img: String
});


var Accomp = mongoose.model('Accomp', accompSchema);

module.exports = Accomp;