var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');

//setup app and port
var app = express();
const port = process.env.PORT || 3000;
//send passport variable for config
require('./config/passport.js')(passport);

//Setup Express
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(logger('dev'));


//Cross Origin Resource Sharing
app.use(cors());

//Session and Cookie Setup
app.use(session({
  secret: 'My_secret',
  credentials: true,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));


app.use(cookieParser());

//setup Flash for passing message between the routes
app.use(flash());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// // view engine setup
// app.set('views engine', 'ejs');
// app.set(express.static(path.join(__dirname, 'views')));


// mongoose setup
var dbConfig = require('./config/db.config.js');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', (err) => {
  console.log(err);
  process.exit();
});

mongoose.connection.on('open', () => {
  console.log('We are live on DB');
});

require('./routes/routes.js')(app, passport);


app.listen(port, () => {

	console.log(`We are live on ${port}`);
});