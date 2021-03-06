import { Router } from 'express';
// Want to use this (working on Jest; Not Working with Sucrase)
// import UserController from '~/app/controllers/UserController';
import UserController from '../app/controllers/UserController';

module.exports = Router({ mergeParams: true })
  .get('/users', UserController.index)
  .post('/users', UserController.store)
