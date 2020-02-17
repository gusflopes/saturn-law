import * as Yup from 'yup';
import Lawfirm from '../models/Lawfirm';

class LawfirmController {
  async index(req, res) {
    try {
      const users = await Lawfirm.findAll();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async store(req, res) {
    try {
      console.log('Create new Lawfirm');
      return res.status(201).json({ message: 'Route working' });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Erro na requisição.' });
    }
  }
}

export default new LawfirmController();
