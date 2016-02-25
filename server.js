//REUIREMENTS
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/champcharts'
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

//mongoose.connect('mongodb://localhost:27017/rewards');
mongoose.connect(mongoUri);

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ name: 'champchart', secret: 'amelia' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//CONTROLLERS
var userController = require('./controllers/userController.js');
app.use('/user', userController);

var accompController = require('./controllers/accompController.js');
app.use('/accomp', accompController);

// MAKES VARIABLE LOGIN IN TEMPLATES
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

require('./config/passport')(passport);

app.get("/", function(req, res) {
  res.redirect("/user")
})

//LISTEN
mongoose.connection.once('open', function() {
	console.log('mongoose connection made')
});

app.listen(port);
console.log('listening' + port);

