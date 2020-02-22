import { Router } from 'express';
import UserController from '../app/controllers/UserController';
// import middlewares and use it before the controller
const routePath = '/users';

module.exports = Router({ mergeParams: true })
  .get(`${routePath}`, UserController.index)
  .post(`${routePath}`, UserController.store);
