import * as Yup from 'yup';
import Lawfirm from '../models/Lawfirm';
import User from '../models/User';

class LawfirmController {
  async index(req, res) {
    try {
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
      return res.status(200).json(lawfirms);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async myLawfirms(req, res) {
    const { userId } = req.query;
    console.log('userId', userId);
    try {
      const lawfirms = await Lawfirm.findAll({
        where: { owner_id: userId },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['name', 'email'],
          },
          {
            model: User,
            as: 'users',
            attributes: ['id', 'name', 'email'],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(lawfirms);
    } catch (err) {
      console.log(err);
      return res
        .status(501)
        .json({ message: 'Erro na requisição.', error: err });
    }
  }

  async store(req, res) {
    try {
      const { userId } = req.query;
      const { name } = req.body;
      console.log('Create new Lawfirm');
      const lawfirm = await Lawfirm.create({ name, owner_id: userId });

      console.log(lawfirm);
      // const users = await lawfirm.getUsers();
      console.log('------------ USERS -----------');
      console.log('------------ NEW USER -----------');
      const userToAdd = await User.findByPk(userId);
      const newUser = await lawfirm.addUser(userToAdd);
      console.log(newUser);
      // criar a associação LawfirmUsers

      return res.status(201).json(lawfirm);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Erro na requisição.' });
    }
  }
}

export default new LawfirmController();
