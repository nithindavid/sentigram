import passport from 'passport';
import bcrypt from 'bcrypt';
import request from 'request';
import { Strategy } from 'passport-local';

import User from '../src/models/user';

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  new User({ id: id })
    .fetch()
    .then(user => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});


passport.use(new Strategy({ usernameField: 'username' }, (username, password, done) => {
  new User({ username: username })
    .fetch()
    .then(user => {
      bcrypt.compare(password, user.attributes.password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user.toJSON());
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    })
    .catch((error) => {
      return done(null, false, { msg: 'Invalid email or password.' });
    });
}));

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export default { isAuthenticated };
