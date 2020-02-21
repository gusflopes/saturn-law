import { Router } from 'express';
import UserController from '~/app/controllers/UserController';

module.exports = Router({ mergeParams: true })
  .get('/', UserController.index)
  .post('/', UserController.store);
