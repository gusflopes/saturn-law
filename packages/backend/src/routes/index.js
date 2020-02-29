import { Router } from 'express';
import passport from 'passport';
import passportConfig from '../config/passport';

// User Routes: Passport will be used
import passportRoute from './passport.routes';
import users from './users.routes';

// Resource Routes
import lawfirms from './lawfirms.routes';
import clients from './clients.routes';
import test from './developer.routes';

// Declaring Middlewares
const passportJWT = passport.authenticate('jwt', { session: false });

// Create the routes
const routes = Router();

console.log('[saturnlaw] setting up routes');

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/v1', passportRoute);
routes.use('/v1', users);

// JWT Authentcation from this stage
routes.use(passportJWT);
routes.use('/v1', lawfirms);
routes.use('/v1', clients);

routes.use('/v2/private', (req, res) => {
  return res.status(200).json({ message: 'Private Resource.' });
});
routes.use(test);

export default routes;
