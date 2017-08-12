import passport from 'passport';
import User from '../models/User';

 const UserController = {

  /**
   * GET /login
   * Login page.
   */
  getLogin(req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('account/login', {
      title: 'Login'
    });
  },

  /**
   * POST /login
   * Sign in using email and password.
   */
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

  /**
   * GET /logout
   * Log out.
   */
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },

  /**
   * GET /signup
   * Signup page.
   */
  getSignup(req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('account/signup', {
      title: 'Create Account'
    });
  },

  /**
   * POST /signup
   * Create a new local account.
   */
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

    new User({ username: req.body.username })
    .fetch()
    .then(user => {
      if (!!user) {
        req.flash('errors', { msg: 'Choose a different username.' });
        return res.redirect('/signup');
      } else {
        new User({ username: req.body.username, name: req.body.name, password: req.body.password })
        .save()
        .then(user => {
          req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Yey! Account created.' });
            res.redirect(req.session.returnTo || '/');
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
  /**
   * GET /logout
   * logout user
   */

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }
 };

 export default UserController;