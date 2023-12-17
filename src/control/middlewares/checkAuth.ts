import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  userId?: string;
}

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'a1a2b3b4');
      if (typeof decoded != 'string') {
        req.userId = decoded.id;
        next();
      } else {
        return res.status(403).json({
          message: 'Невозможно разшифровать, он стринг',
        });
      }
    } catch (error) {
      return res.status(403).json({
        message: 'Невозможно разшифровать по этому ключу',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нету доступа',
    });
  }
};
