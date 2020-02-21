const { Router } = require('express');

const routes = Router();

routes.get('/test', async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Hello !!' });
  } catch (error) {
    next(error);
  }
});
routes.get('/2', async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Hello 2 !!' });
  } catch (error) {
    next(error);
  }
});

routes.post('/hello/:name', async (req, res, next) => {
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

export default routes;
