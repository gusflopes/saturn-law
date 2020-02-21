import { Router } from 'express';
import users from './users';
import lawfirms from './lawfirms.routes';
import lawfirmMembers from './lawfirmMembers.routes';
import test from './developer.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/users', users);
routes.use('lawfirms/members', lawfirmMembers);
routes.use('lawfirms/', lawfirms);
routes.use(test);

export default routes;
