import { Router } from 'express';
import ClientController from '../app/controllers/ClientController';
import TelephoneController from '../app/controllers/TelephoneController';

module.exports = Router({ mergeParams: true })
  .get('/:clientId/telephones/:telephoneId', TelephoneController.show)
  .get('/:clientId/telephones', TelephoneController.index)
  .get('/:clientId', ClientController.show)
  .get('/', ClientController.index)
  .post('/', ClientController.store);
