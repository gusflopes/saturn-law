import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/test', require('./routes/developer.routes'));
routes.use('/users', require('./routes/users.routes'));
routes.use('/lawfirms/members', require('./routes/lawfirmMembers.js'));
routes.use('/lawfirms', require('./routes/lawfirms.routes'));
routes.use('/clients', require('./routes/clients.routes'));

// middlewares

// Private Routes

// routes.get('/lawfirms', LawfirmController.index);
// routes.post('/lawfirms', LawfirmController.store);

export default routes;
