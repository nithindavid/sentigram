import { Router } from 'express';
import User from './models/user';
const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
});

routes.get('/signup', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Signup'
  });
});

routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  let user = new User({name: 'nithin', username: 'nithin', password: '12345'})
  .save()
  .then(model => {
    console.log(model);
  }).catch(error => {
    console.log(error);
  });

  res.render('index', { title });
});

export default routes;
