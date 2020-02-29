import * as Yup from 'yup';
import User from '../models/User';
import Profile from '../models/Profile';
import ProfileService from '../services/Profile';

class OauthController {
async findUserProfile(req, res) {
  // Exemplo de Verificação se o usuário já possui o Profile de Oauth
  const email = 'gustavo@hublaw.com.br';
  const parseUrl =  req.path.split('/passport/oauth/')
  const social_media = parseUrl[1];

  const findUser = await ProfileService.findUserProfile(email, social_media);

  if (!findUser.success) {
    return res.status(401).json({error: findUser.message});
  }
  return res.status(200).json(findUser.user);
}

async createUserProfile(req, res) {
  // Exemplo de criação de um novo profile a ser incorporado nas rotas de Oauth (SignUp)
  console.log(req.params);
  const email = 'gustavo@hublaw.com.br';
  const newProfile = {
    social_media: 'facebook',
    social_id: '03724b51-e28b-4989-a89d-7653b5a8ae90',
    email: 'gustavo@hublaw.com.br',
    name: 'Gustavo Lopes',
  };
  const social = 'google';

  const response = await ProfileService.createUserProfile(email, newProfile, social)

  if (!response.success) {
    const {message, profile} = response;
    return res.status(201).json({message: message, profile: profile})
  }

  console.log(response.err);
  return res.status(401).json({error: response.message})

}

}
export default new OauthController;
