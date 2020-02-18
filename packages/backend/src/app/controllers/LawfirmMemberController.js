import * as Yup from 'yup';
import Lawfirm from '../models/Lawfirm';
import User from '../models/User';

class LawfirmController {
  async newUser(req, res) {
    const { userId, lawfirmId } = req.query;
    const { name, email, password } = req.body;

    const isUserMember = await Lawfirm.findByPk(lawfirmId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name', 'email'],
          where: { email: email.toLowerCase() },
          through: { attributes: [] },
        },
      ],
    });

    if (isUserMember) {
      return res.status(401).json(isUserMember);
    }
    const lawfirm = await Lawfirm.findByPk(lawfirmId);
    console.log('########## LAWFIRM #########');
    console.log(lawfirm);

    const userExists = await User.findOne({
      where: { email },
    });
    if (!userExists) {
      // resolver se password estiver vazio
      const user = await User.create({ name, email, password });
      const newUser = await lawfirm.addUser(user);
      return res.status(201).json(newUser);
    }

    const newUser = await lawfirm.addUser(userExists);
    return res.status(201).json(newUser);
  }

  async store(req, res) {
    const { userId, lawfirmId } = req.query;
    const { name, email, password } = req.body;
    // Essas informações vão vir do JWT Token;
    console.log('userId: ', userId, 'lawfirmId: ', lawfirmId);
    console.log(req.body);
    const userIdAlreadyMember = await Lawfirm.findByPk(lawfirmId, {
      include: [
        { model: User, as: 'users', through: { where: { user_id: userId } } },
      ],
    });
    console.log(userIdAlreadyMember);
    const userisMember = await Lawfirm.findByPk(lawfirmId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name', 'email', 'password_hash'],
          where: { email: email.toLowerCase(), name },
          through: { attributes: [] },
        },
      ],
    });
    if (!userisMember) {
      console.log('Need to create a new user');
      const userExists = await User.findOrCreate({
        where: { email },
        defaults: { name, email, password },
      });

      console.log('user created:', userExists);

      try {
        userExists.setLawfirm(lawfirmId);
      } catch (err) {
        console.log('Failed to associate');
        console.log(err);
      }

      return res.status(201).json({ message: 'New user will be created' });
    }

    return res.json(userisMember);

    // Verificar se usuário já é membro

    // Adicionar relação

    // Responder mensagem
    return res.status(200).json({ message: 'Route working' });
  }

  async listLawfirmMembers(req, res) {
    // List all members of the Lawfirm using ID
    const { userId, lawfirmId } = req.query;
    const lawfirms = await Lawfirm.findByPk(lawfirmId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json(lawfirms);
  }

  async listUsersLawfirms(req, res) {
    // List all Lawfirms of the User using ID
    const { userId, lawfirmId } = req.query;
    const users = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Lawfirm,
          as: 'lawfirms',
          attributes: [
            'id',
            'name',
            'slug',
            'active',
            'createdAt',
            'updatedAt',
          ],
          through: {
            // only shows Lawfirm with User!?
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json(users);
  }
}

export default new LawfirmController();
