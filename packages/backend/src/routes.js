import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LawfirmController from './app/controllers/LawfirmController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// middlewares

// Private Routes

routes.get('/lawfirms', LawfirmController.index);
routes.post('/lawfirms', LawfirmController.store);

export default routes;
