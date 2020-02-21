import * as Yup from 'yup';
import User from '../../../app/models/User';

export default async function newUser(req, res) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  // Validar o Schema
  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails.' });
  }

  const userExists = await User.findOne({ where: { email: req.body.email } });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists.' });
  }
  console.log('passou em tudo.');
  // Create a user with the information provided on req.body, and give back just  a few columns
  const { id, name, email } = await User.create(req.body);

  return res.json({
    id,
    name,
    email,
  });
}
