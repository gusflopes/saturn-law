import { Router } from 'express';
import LawfirmMemberController from '../app/controllers/LawfirmMemberController';

const routes = Router();

routes.get('/lawfirms/members', LawfirmMemberController.listLawfirmMembers);
routes.post('/lawfirms/members', LawfirmMemberController.newUser);

export default routes;
