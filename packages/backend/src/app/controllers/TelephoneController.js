import * as Yup from 'yup';
import Client from '../models/Client';
import Lawfirm from '../models/Lawfirm';
import Address from '../models/Address';
import Telephone from '../models/Telephone';

class TelephoneController {
  async index(req, res) {
    const { lawfirmId, userId } = req.query;
    const { clientId } = req.params;
    try {
      const telephones = await Client.findAll({
        where: { lawfirm_id: lawfirmId, id: clientId },
        attributes: ['id', 'lawfirm_id', 'name'],
        include: [
          {
            model: Telephone,
            as: 'telephones',
          },
        ],
      });
      return res.status(200).json(telephones);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async show(req, res) {
    const { lawfirmId, userId } = req.query;
    const { clientId, telephoneId } = req.params;

    const telephone = await Client.findAll({
      where: { lawfirm_id: lawfirmId, id: clientId },
      attributes: ['id', 'lawfirm_id', 'name'],
      include: [
        {
          where: { id: telephoneId },
          model: Telephone,
          as: 'telephones',
          attributes: ['id', 'ddd', 'number'],
        },
      ],
    });

    return res.status(200).json(telephone);
  }

  async store(req, res) {
    const { lawfirmId } = req.query;

    const newClient = { lawfirm_id: lawfirmId, ...req.body };
    const client = await Client.create(newClient, {
      include: [
        {
          model: Address,
          as: 'addresses',
        },
        {
          model: Telephone,
          as: 'telephones',
        },
      ],
    });
    return res.status(201).json(client);
  }
}

export default new TelephoneController();
