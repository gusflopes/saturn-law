import { Router } from 'express';

// import UserController from './app/controllers/UserController';
// import LawfirmController from './app/controllers/LawfirmController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/test', require('./routes/test'));
routes.use('/users', require('./routes/users'));
routes.use('/lawfirms/members', require('./routes/lawfirmMembers.js'));
routes.use('/lawfirms', require('./routes/lawfirms'));

routes.use('/v1', require('./routes/v1/users', './routes/v1/hello'));

// middlewares

// Private Routes

// routes.get('/lawfirms', LawfirmController.index);
// routes.post('/lawfirms', LawfirmController.store);

export default routes;
