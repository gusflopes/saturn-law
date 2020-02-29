import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';
import authConfig from '../../config/auth';

const signToken = user => {
  const token = jwt.sign(
    {
      iss: process.env.APP_NAME,
      sub: user.id,
      // Criar um campo para as Lawfirms
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + authConfig.expiresIn),
    },
    authConfig.secret
  );
  return token;
};

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password } = req.value.body;

      // check if there is a user with the same email
      const foundUser = await User.findOne({ where: { email } });

      if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use.' });
      }

      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();

      const token = signToken(newUser);

      res.status(201).json({ message: 'User created.', token });
    } catch (err) {
      next(err);
    }
  },

  // signIn
  signIn: async (req, res, next) => {
    try {
      // Generate token
      // const token = signToken();
      const token = signToken(req.user);
      res.status(200).json({ message: 'Successfully logged in.', token });
    } catch (err) {
      next(err);
    }
  },

  // googleOauth
  googleOauth: async (req, res, next) => {
    // Generate token
    console.log('req.user', req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  // facebookOauth
  facebookOauth: async (req, res, next) => {
    // Generate token
    console.log('req.user', req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    try {
      console.log('I managed to get here!');
      res.status(200).json({ secret: 'resource' });
    } catch (err) {
      next(err);
    }
  },
};
