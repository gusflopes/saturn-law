import Profile from '../models/Profile';
import User from '../models/User';
import Lawfirm from '../models/Lawfirm';

class LawfirmService {

  async getUserLawfirms(userId, lawfirmId) {
 try {
   console.log('userId', userId);

    const lawfirm = await Lawfirm.findByPk(lawfirmId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name', 'email'],
          where: {id: userId},
          // where: {id: 'e1d63791-5f85-422c-b044-ac51651bf435'},
          through: {
            attributes: [],
          },
        },
      ],
    });

    /***
     * UPGRADE THIS: Get the user roles with another Include.
     * It shall be contained on the 'lawfirm' object
     */

    if (!lawfirm) {
      return {success: false, lawfirm: null, message: "Lawfirm not found.", error: null}
    }

    return {success: true, lawfirm: lawfirm, message: "Lawfirm found.", error: null}
} catch (err) {
  console.log(err);
  return {success: false, lawfirm: false, message: "An error ocurred.", error: err}
}
  }


  async getUserLawfirmsNOOO(userId) {
    // const { userId } = req.query;
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
}

export default new LawfirmService();
