import { Request, Response, NextFunction } from 'express';
import { verifyDevaplaySignature } from '../utils/verifyDevaplaySignature';

export const verifyDevaplayMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'] || '';
  const isValid = verifyDevaplaySignature(authorization as string, req.method, req.originalUrl);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid Devaplay signature' });
  }

  next();
};
