import jwt from 'jsonwebtoken';
import UserService from '../services/User.service';
import { RequestObject, ResponseObject } from './types';

/**
 * Auth middleware
 * @param {RequestObject} req - Request object
 * @param {ResponseObject} res - Response object
 * @param {Function} next - Next middleware function
 */
const authMiddleWare = async (
  req: RequestObject,
  res: ResponseObject,
  next: Function
): Promise<void> => {
  const token = req.headers['token'] || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const jwtSecret: any = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      user: { id: string };
    };
    req.user = await UserService.getOne({ id: decoded.user.id });

    res.url = req.url;
    res.user = req.user;

    next();
  } catch (ex) {
    res.status(401).send('Invalid token.');
  }
};

export default authMiddleWare;
