import { Router } from 'express';
import ClientController from '../app/controllers/ClientController';
import TelephoneController from '../app/controllers/TelephoneController';

const routePath = '/clients';
module.exports = Router({ mergeParams: true })
  // TELEPHONES
  .get(
    `${routePath}/:clientId/telephones/:telephoneId`,
    TelephoneController.show
  )
  .delete(
    `${routePath}/:clientId/telephones/:telephoneId`,
    TelephoneController.destroy
  )
  .put(
    `${routePath}/:clientId/telephones/:telephoneId`,
    TelephoneController.update
  )
  .get(`${routePath}/:clientId/telephones`, TelephoneController.index)
  .post(`${routePath}/:clientId/telephones`, TelephoneController.store)

  // ADDRESSES

  // CLIENTS
  .get(`${routePath}/:clientId`, ClientController.show)
  // delete
  // update
  .get(`${routePath}`, ClientController.index)
  .post(`${routePath}`, ClientController.store);
