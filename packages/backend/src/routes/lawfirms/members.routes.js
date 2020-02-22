import { Router } from 'express';
import LawfirmMemberController from '../../app/controllers/LawfirmMemberController';

const routes = Router();

// Subroutes only contain route params or path for child route
// In this case, parent route: /lawfirms/members
routes.get('/', LawfirmMemberController.listLawfirmMembers);
routes.post('/', LawfirmMemberController.newUser);
// Example if there was a subroute;
// routes.use('/child', './members/child.routes);

export default routes;
