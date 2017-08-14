import { Router } from 'express';
import User from './models/user';

import passportConfig from '../config/passport';
// Controllers
import authController from './controllers/auth';
import feedController from './controllers/feed';
import userController from './controllers/user';

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

routes.get('/login', authController.getLogin);
routes.post('/login', authController.postLogin);
routes.get('/signup', authController.getSignup);
routes.post('/signup', authController.postSignup);
routes.get('/logout', authController.logout);

routes.get('/feed', passportConfig.isAuthenticated, feedController.getFeed);
routes.post('/feed', passportConfig.isAuthenticated, feedController.postFeed);
routes.put('/:followee_id/follow', passportConfig.isAuthenticated, userController.followUser);
routes.get('/:followee_id/follow', passportConfig.isAuthenticated, userController.followUser);

routes.get('/:user_id', passportConfig.isAuthenticated, userController.getProfile);

export default routes;
