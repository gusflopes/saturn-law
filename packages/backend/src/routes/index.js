import { Router } from 'express';
import users from './users.routes';
import lawfirms from './lawfirms.routes';
import clients from './clients.routes';
import test from './developer.routes';

const routes = Router();

console.log('[saturnlaw] setting up routes');

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/v1', users);
routes.use('/v1', lawfirms);
routes.use('/v1', clients);
routes.use(test);

export default routes;
