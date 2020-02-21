import { Router } from 'express';
import LawfirmMemberController from '../app/controllers/LawfirmMemberController';

const routes = Router();

routes.get('/', LawfirmMemberController.listLawfirmMembers);
routes.post('/', LawfirmMemberController.newUser);

export default routes;
