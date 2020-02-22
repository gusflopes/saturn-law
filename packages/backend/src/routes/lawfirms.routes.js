import { Router } from 'express';
import LawfirmController from '../app/controllers/LawfirmController';

const routePath = '/lawfirms';

module.exports = Router({ mergeParams: true })
  .get(`${routePath}`, LawfirmController.index)
  .get(`${routePath}/mine`, LawfirmController.myLawfirms)
  .post(`${routePath}`, LawfirmController.store);
