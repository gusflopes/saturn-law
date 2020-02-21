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

  async destroy(req, res) {
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
    console.log(telephone);
    if (telephone.length === 0) {
      return res.status(401).json({message: 'Telephone not found.'})
    }
    try {
      await Telephone.destroy({where: {
        id: telephoneId
      }});
      return res.status(200).json({message: 'Telephone deleted.'});
   } catch (err) {
     return res.status(500).json({message: 'Error deleting Telephone.'})
   }
  }

  async update(req,res) {
    const { lawfirmId, userId } = req.query;
    const { clientId, telephoneId } = req.params;
    const {ddd, number, type} = req.body;

    const telephone = await Telephone.findByPk(telephoneId);
    if (!telephone) {
      return res.status(401).json({message: 'Telephone not found.'})
    }

    const response = await telephone.update({ddd, number, type});

    return res.status(200).json(response);
  }

  async store(req, res) {
    const { lawfirmId, userId } = req.query;
    const { clientId } = req.params;
    const {ddd, number, type} = req.body;

    // Criando telefone direto pois permissão para acessar rota
    // daquele cliente deve ser verificada em um middleware anterior


    const telephone = await Telephone.create({client_id: clientId, ddd, number, type});
    return res.status(201).json(telephone);
  }
}

export default new TelephoneController();
