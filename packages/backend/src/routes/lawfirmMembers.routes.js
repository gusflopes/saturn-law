import { Router } from 'express';
import LawfirmMemberController from '../app/controllers/LawfirmMemberController';

const routePath = '/lawfirms/members';

module.exports = Router({ mergeParams: true })
  .get(`${routePath}`, LawfirmMemberController.listLawfirmMembers)
  .post(`${routePath}`, LawfirmMemberController.newUser);
