//REUIREMENTS
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/rewards');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//CONTROLLERS
var userController = require('./controllers/userController.js');
app.use('/users', userController);

var accomplishController = require('./controllers/accomplishController.js');
app.use('/accomplish', accomplishController);

//LISTEN
mongoose.connection.once('open', function() {
	console.log('mongoose connection made')
});

app.listen(port);
console.log('listening' + port);

