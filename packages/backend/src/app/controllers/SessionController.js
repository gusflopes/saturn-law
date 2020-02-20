import jwt from 'jsonwebtoken';

import User from '../models/User';

const signToken = user => {
  const token = jwt.sign(
    {
      iss: 'SaturnLaw', // issuer
      sub: 'user.id', // subject
      iat: new Date().getTime(), // issued_at
      exp: new Date().setDate(new Date().getDate() + 1), // expires in 1 day
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  signUp: async (req, res, next) => {
    const user = { id: 1 };
    const token = signToken(user);
    return res.status(201).json({ message: 'Route not working', token });
  },

  signIn: async (req, res, next) => {
    try {
      console.log('signIn');
    } catch (err) {
      next(err);
    }
  },
  secret: async (req, res, next) => {
    console.log('Easter Egg found');
    return res.status(200).json({ secret: 'You found an Easter Egg' });
  },
};
