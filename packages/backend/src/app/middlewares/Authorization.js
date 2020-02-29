// The function of this middleware is to manage User's Authorization and Roles;
// 1: User cannot access a resource that belongs to a Lawfirm he is not member;
// 2: User cannot perform an action that he has no role authorizing

import User from '../models/User';
import Lawfirm from '../services/Lawfirm';

export default async (req, res, next) => {
  const userId = req.user.id;
  const {lawfirmId} = req.params;
  // req.user
  // Adicionar: lawfirms: {roles}
  const authorization = await Lawfirm.getUserLawfirms(userId, lawfirmId)

  if (!authorization.lawfirm) {
    return res.status(401).json({error: "User has no Authorization to access this lawfirm."})
  }

  req.lawfirm = authorization.lawfirm;
  // console.log(authorization);

  return next()
};
