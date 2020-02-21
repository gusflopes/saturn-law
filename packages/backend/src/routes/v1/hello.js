import { Router } from 'express';

module.exports = Router({ mergeParams: true }).get('/hello', (req, res) => {
  return res.status(200).send({ hello: 'world' });
});
