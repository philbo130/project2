//REUIREMENTS
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

mongoose.connect('mongodb://localhost:27017/rewards');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//CONTROLLERS
var userController = require('./controllers/userController.js');
app.use('/user', userController);

var accompController = require('./controllers/accompController.js');
app.use('/accomp', accompController);

require('./config/passport')(passport);

//LISTEN
mongoose.connection.once('open', function() {
	console.log('mongoose connection made')
});

app.listen(port);
console.log('listening' + port);

