import * as Yup from 'yup';
import Client from '../models/Client';
import Lawfirm from '../models/Lawfirm';
import Address from '../models/Address';
import Telephone from '../models/Telephone';

class ClientController {
  async index(req, res) {
    const { lawfirmId } = req.query;
    try {
      const clients = await Client.findAll({
        where: { lawfirm_id: lawfirmId },
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
      return res.status(200).json(clients);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async show(req, res) {
    const { lawfirmId } = req.query;
    const { clientId } = req.params;

    const client = await Client.findByPk(clientId, {
      include: [
        { model: Address, as: 'addresses' },
        { model: Telephone, as: 'telephones' },
      ],
    });

    return res.status(200).json(client);
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

export default new ClientController();
