import { Router } from 'express';
import User from './models/user';

import passportConfig from '../config/passport';
// Controllers
import userController from './controllers/user';

const routes = Router();
/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.get('/login', userController.getLogin);
routes.post('/login', userController.postLogin);
routes.get('/signup', userController.getSignup);
routes.post('/signup', userController.postSignup);
routes.get('/logout', userController.logout);

export default routes;
