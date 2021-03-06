import { Router } from 'express';
import passport from 'passport';

import { validateBody, schemas } from '../helpers/routeHelpers';

import UserController from '../app/controllers/users';
import OauthController from '../app/controllers/OauthController';


const passportSignIn = passport.authenticate('local', { session: false });

/*
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', {
  session: false,
});
*/

module.exports = Router({ mergeParams: true })
  .post(
    '/passport/signup',
    validateBody(schemas.userSchema),
    UserController.signUp
  )
  .post(
    '/passport/signin',
    validateBody(schemas.authSchema),
    passportSignIn,
    UserController.signIn
  )
  .post('/passport/oauth/google', OauthController.createUserProfile)
  .get('/passport/oauth/google', OauthController.findUserProfile);
