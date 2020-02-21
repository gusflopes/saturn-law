import { Router } from 'express';
import LawfirmController from '../app/controllers/LawfirmController';

module.exports = Router({ mergeParams: true })
  .get('/', LawfirmController.index)
  .get('/mine', LawfirmController.myLawfirms)
  .post('/', LawfirmController.store);
