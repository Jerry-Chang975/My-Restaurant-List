const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const db = require('../models');
const User = db.User;

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (username, password, done) => {
      try {
        let user = await User.findOne({
          attributes: ['id', 'name', 'email', 'password'],
          where: { email: username },
          raw: true,
        });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        isMatch
          ? done(null, user)
          : done(null, false, { message: 'Incorrect email or password.' });
      } catch (error) {
        error.errorMessage = 'login failed';
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  const { id, name, email } = user;
  return done(null, { id, name, email });
});

passport.deserializeUser((user, done) => {
  done(null, { id: user.id, name: user.name, email: user.email });
});

module.exports = passport;
