import passport from 'passport';
import User from '../models/User';

import AuthService from '../services/auth';

 const AuthController = {

  getLogin(req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('account/login', {
      title: 'Login'
    });
  },

  postLogin(req, res, next) {
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();

    req.getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          req.flash('errors', result.mapped());
          return res.redirect('/login');
        }
      });

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('errors', info);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect(req.session.returnTo || '/');
      });
    })(req, res, next);
  },

  getSignup(req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('account/signup', {
      title: 'Create Account'
    });
  },

  postSignup(req, res, next) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);

    req.getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          req.flash('errors', result.mapped());
          return res.redirect('/signup');
        }
      });

    AuthService
    .fetchUser(req.body)
    .then(user => {
      if (!!user) {
        req.flash('errors', { msg: 'Choose a different username.' });
        return res.redirect('/signup');
      } else {
        AuthService
        .saveUser(req.body)
        .then(user => {
          req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Yey! Account created.' });
            res.redirect('/');
          });
        })
        .catch((error) => {
          req.flash('errors', { msg: 'Something went wrong! Try again.' });
          return res.redirect('/signup');
        });
      }
    })
    .catch((error) => {
      return done(null, false, { msg: 'Something went wrong! Try again.' });
    });
  },

  logout(req, res) {
    req.logout();
    res.redirect('/');
  },

 };

 export default AuthController;