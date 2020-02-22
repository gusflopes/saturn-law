import { Router } from 'express';

module.exports = Router({ mergeParams: true })
  .get('/test', async (req, res, next) => {
    try {
      res.status(200).json({ message: 'Hello !!' });
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
