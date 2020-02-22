import { Router } from 'express';
import Controller from '../../app/controllers/TelephoneController';

const routes = Router();
// Subroutes only contain route params or path for child route
// In this case, parent route: /lawfirms/members
// Example if there was a subroute;
// routes.use('/child', './members/child.routes);

routes.get('/:clientId/telephones/:telephoneId', Controller.show);
routes.delete('/:clientId/telephones/:telephoneId', Controller.destroy);
routes.put('/:clientId/telephones/:telephoneId', Controller.update);
routes.get('/:clientId/telephones', Controller.index);
routes.post('/:clientId/telephones', Controller.store);

export default routes;
