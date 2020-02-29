import * as Yup from 'yup';
import User from '../models/User';
import Profile from '../models/Profile';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Profile,
            as: 'profiles',
          },
        ],
      });
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async findUserProfile(req, res) {
    const email = 'gustavo@saturnlaw.com.br';
    const social_media = 'facebook';

    const findUser = await Profile.findUserProfile(email, social_media);

    if (!findUser.found) {
      return res.status(401).json({ error: 'User not found.' });
    }
    return res.status(200).json(findUser.user);
  }

  async createUserProfile(req, res) {
    const email = 'gustavo@saturnlaw.com.br';
    const newProfile = {
      social_media: 'twitter',
      social_id: '03724b51-e28b-4989-a89d-7653b5a8ae90',
      email: 'gustavo@saturnlaw.com.br',
      name: 'Gustavo Lopes',
    };

    const user = await User.findOne({
      where: { email },
      include: [{ model: Profile, as: 'profiles' }],
    });
    console.log(user.profiles);

    const profileExists = await user.profiles
      .map(e => {
        return e.social_media;
      })
      .indexOf(newProfile.social_media);
    console.log(profileExists);

    if (profileExists < 0) {
      // Ainda não existe o Profile, posso criar um novo!
      try {
        const currentProfile = await user.createProfile(newProfile);
        return res
          .status(201)
          .json({ message: 'New profile created', profile: currentProfile });
      } catch (err) {
        return res.status(401).json({
          error: "You can't create an account with that Social media.",
        });
      }
    }
    const profileList = await user.getProfiles();
    return res.status(401).json({
      error: 'Profile already exists. Try to login.',
      profiles: profileList,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validar o Schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    // Create a user with the information provided on req.body, and give back just  a few columns
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    // Right now it is finding the ID by the token provided.
    // You can only change your own user information
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
