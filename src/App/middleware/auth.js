import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/secret';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { return res.status(401).json({ message: 'Token not provided!' }); }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.idUser = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'token invalid!' });
  }
};
