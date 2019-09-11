let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;

//import the database collection
let User = require('../models/player');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
