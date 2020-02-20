import { Router } from 'express';
import ClientController from '../app/controllers/ClientController';
import TelephoneController from '../app/controllers/TelephoneController';

module.exports = Router({ mergeParams: true })
  // TELEPHONES
  .get('/:clientId/telephones/:telephoneId', TelephoneController.show)
  .delete('/:clientId/telephones/:telephoneId', TelephoneController.destroy)
  .put('/:clientId/telephones/:telephoneId', TelephoneController.update)
  .get('/:clientId/telephones', TelephoneController.index)
  .post('/:clientId/telephones', TelephoneController.store)

  // ADDRESSES

  // CLIENTS
  .get('/:clientId', ClientController.show)
  // delete
  // update
  .get('/', ClientController.index)
  .post('/', ClientController.store);
