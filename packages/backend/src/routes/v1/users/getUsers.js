import User from '../../../app/models/User';

export default async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: 'Erro na requisição.' });
  }
}
