import User from '../app/models/User';
import Lawfirm from '../app/models/Lawfirm';

const { Router } = require('express');

module.exports = Router({ mergeParams: true })
  .get('/', async (req, res, next) => {
    try {
      // Receber o login
      const email = 'gustavo@saturnlaw.com.br';
      const password = '123456';

      // Buscar usuário
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Lawfirm,
            as: 'lawfirms',
            where: {
              active: true,
            },
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      // Comparar a senha
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Password not valid' });
      }

      // Criar o Array
      const lawfirms = [];
      user.lawfirms.map(lawfirm => {
        lawfirms.push(lawfirm.id);
      });

      // Como vou escolher qual lawfirm ele está autenticado?
      // Verifico se a lawfirmId que está na requisição está contida no JWT
      const response = { userId: user.id, lawfirmId: lawfirms[0], lawfirms };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  })
  .get('/2', async (req, res, next) => {
    try {
      res.status(200).json({ message: 'Hello 2 !!' });
    } catch (error) {
      next(error);
    }
  })

  .post('/hello/:name', async (req, res, next) => {
    try {
      const { name } = req.params;
      if (name) {
        return res.status(200).json({ message: `Hello ${name}` });
      }
      res.status(200).json({ message: 'Hello !!' });
    } catch (error) {
      next(error);
    }
  });
