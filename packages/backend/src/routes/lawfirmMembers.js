import { Router } from 'express';
import LawfirmMemberController from '../app/controllers/LawfirmMemberController';

module.exports = Router({ mergeParams: true })
  .get('/', LawfirmMemberController.listLawfirmMembers)
  .post('/', LawfirmMemberController.newUser);
