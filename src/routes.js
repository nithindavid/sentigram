import { Router } from 'express';
import User from './models/user';

import passportConfig from '../config/passport';
// Controllers
import userController from './controllers/user';
import feedController from './controllers/feed';

const routes = Router();
/**
 * GET home page
 */

routes.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/feed');
  } else {
    return res.redirect('/login');
  }
});

routes.get('/login', userController.getLogin);
routes.post('/login', userController.postLogin);
routes.get('/signup', userController.getSignup);
routes.post('/signup', userController.postSignup);
routes.get('/logout', userController.logout);

routes.get('/feed', passportConfig.isAuthenticated, feedController.getFeed);
routes.post('/feed', passportConfig.isAuthenticated, feedController.postFeed);

export default routes;
