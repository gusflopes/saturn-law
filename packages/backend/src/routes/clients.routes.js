import { Router } from 'express';
import ClientController from '../app/controllers/ClientController';
import ClientTelephonesRoutes from './clients/telephones.routes';

const routes = Router();
// TELEPHONES
routes.use('/clients', ClientTelephonesRoutes);

routes.get('/clients/:clientId', ClientController.show);
// delete
// update
routes.get('/clients/', ClientController.index);
routes.post('/clients/', ClientController.store);

export default routes;
