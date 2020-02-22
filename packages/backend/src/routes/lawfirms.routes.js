import { Router } from 'express';
import LawfirmController from '../app/controllers/LawfirmController';
import LawfirmMembersRoutes from './lawfirms/members.routes';

module.exports = Router({ mergeParams: true })
  .get('/lawfirms', LawfirmController.index)
  .get('/lawfirms/mine', LawfirmController.myLawfirms)
  .post('/lawfirms', LawfirmController.store)
  .use('/lawfirms/members', LawfirmMembersRoutes);
