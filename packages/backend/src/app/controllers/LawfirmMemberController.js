import * as Yup from 'yup';
import Lawfirm from '../models/Lawfirm';
import User from '../models/User';

class LawfirmMembersController {
  async newUser(req, res) {
    const { userId, lawfirmId } = req.query;
    const { name, email, password } = req.body;

    // name e email required... password pode ou não ter

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
      return res.status(401).json({message: `User '${isUserMember.users[0].name}' is already member of '${isUserMember.name}'`});
    }
    const lawfirm = await Lawfirm.findByPk(lawfirmId);
    console.log('########## LAWFIRM #########');
    console.log(lawfirm);

    const userExists = await User.findOne({
      where: { email },
    });
    if (!userExists) {
      // resolver se password estiver vazio
      const userPassword = password ? password : Math.random().toString(36).slice(-10);

      const user = await User.create({ name, email, password: userPassword });
      const newUser = await lawfirm.addUser(user);
      return res.status(201).json({message: `User ${name} created/added to ${lawfirm.name}`});
    }

    const newUser = await lawfirm.addUser(userExists);
    return res.status(201).json(newUser);
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

export default new LawfirmMembersController();
