let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let flash = require('connect-flash');
let redis = require('redis');
let session = require('express-session');
let passport = require('./passport/conf');

//the redis database for session store
let RedisStore = require('connect-redis')(session);
let client = redis.createClient();
let sessionStore = new RedisStore({ client });
//Import the mongoose module
let mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1:27017/poker'
const options = {
    useNewUrlParser:true,
    user: "ziyi",
    pass: "424358466"
};

mongoose.connect(mongoDB, options);

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.once('open', ()=>{
//    const script = require('./scripts/createUser');
//    script.create_2();
//
//})

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    store: sessionStore, 
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.sessionStore = sessionStore;
