import { Router } from 'express';
import LawfirmController from '../app/controllers/LawfirmController';

const routes = Router();

routes.get('/lawfirms', LawfirmController.index);
routes.get('/lawfirms/mine', LawfirmController.myLawfirms);
routes.post('/lawfirms', LawfirmController.store);

export default routes;
