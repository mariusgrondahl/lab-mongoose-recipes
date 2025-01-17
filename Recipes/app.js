require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
hbs.registerPartials(__dirname + '/views/partials');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Setting upp session
var session = require('express-session')

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
}))
// end configuring express session

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Connect to Database
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
mongoose.connection.on('connected', () => {  
  console.log('Mongoose er åpen for idag');
}); 

// Routes to Route files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Using the routes and defining the base Path for each route file
app.use('/', indexRouter);
app.use('/user', usersRouter);


app.use(function(req,res, next){
  res.send("Error")
})

module.exports = app;
