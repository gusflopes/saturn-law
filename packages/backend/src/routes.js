import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
// routes.post('/users', UserController.store);

// middlewares

// Private Routes

export default routes;
