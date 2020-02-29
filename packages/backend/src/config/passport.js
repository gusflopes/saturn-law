import User from '../app/models/User';
import Lawfirm from '../app/models/Lawfirm';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
// const FacebookTokenStrategy = require('passport-facebook-token');

const LocalStrategy = require('passport-local').Strategy;

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payLoad, done) => {
      try {
        // Find the user specified in token
        const user = await User.findByPk(payLoad.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({
          where: { email },
          include: [{ model: Lawfirm, as: 'lawfirms', attributes: ['id'] }],
        });

        const lawfirms = await Lawfirm.findAll({
          include: [
            { model: User, as: 'owner', attributes: ['name', 'email'] },
            {
              model: User,
              as: 'users',
              attributes: ['id', 'name', 'email'],
              through: { attributes: [] },
            },
          ],
        });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/*
// GOOGLE OAUTH STRATEGY
passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // other code
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          console.log('User already exists in our database.');
          return done(null, existingUser);
        }

        // HERE I NEED TO CREATE A VERIFICATION IF THE USER IS ALREADY CREATED
        // WITH THE LOCAL STRATEGY AND PREVENT FROM CREATING ANOTHER USER
        // THE SAME WITH FACEBOOK

        console.log("User doesn't exists, we 're creating a new one. ");

        // If new account
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

/*
// FACEBOOK STRATEGY
passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ 'facebook.id': profile.id });
        if (existingUser) {
          console.log('User already exists in our database');
          return done(null, existingUser);
        }

        // HERE I NEED TO CREATE A VERIFICATION IF THE USER IS ALREADY CREATED
        // WITH THE LOCAL STRATEGY AND PREVENT FROM CREATING ANOTHER USER
        // THE SAME WITH FACEBOOK

        console.log("User doesn't exists, we 're creating a new one. ");

        // If new account
        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
*/
