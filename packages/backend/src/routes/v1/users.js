import { Router } from 'express';
import newUser from './users/newUser';
import getUsers from './users/getUsers';

module.exports = Router({ mergeParams: true })
  .get('/users', getUsers)
  .post('/users', newUser);
