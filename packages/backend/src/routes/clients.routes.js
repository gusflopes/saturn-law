import { Router } from 'express';
import ClientController from '../app/controllers/ClientController';
import TelephoneController from '../app/controllers/TelephoneController';

const routes = Router();
// TELEPHONES
routes.get('/:clientId/telephones/:telephoneId', TelephoneController.show);
routes.delete(
  '/:clientId/telephones/:telephoneId',
  TelephoneController.destroy
);
routes.put('/:clientId/telephones/:telephoneId', TelephoneController.update);
routes.get('/:clientId/telephones', TelephoneController.index);
routes.post('/:clientId/telephones', TelephoneController.store);

// ADDRESSES

// CLIENTS
routes.get('/:clientId', ClientController.show);
// delete
// update
routes.get('/', ClientController.index);
routes.post('/', ClientController.store);

export default routes;
