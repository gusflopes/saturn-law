import { Router } from 'express';
import users from './users.routes';
import lawfirms from './lawfirms.routes';
import lawfirmMembers from './lawfirmMembers.routes';
import test from './developer.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use(users);
routes.use(lawfirmMembers);
routes.use(lawfirms);
routes.use(test);

export default routes;
