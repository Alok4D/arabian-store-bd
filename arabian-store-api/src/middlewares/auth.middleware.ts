import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: { id: string; email: string };
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Unauthorized. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ success: false, message: 'Unauthorized. Malformed token.' });
      return;
    }

    const secretKey: string = process.env.JWT_SECRET ? String(process.env.JWT_SECRET) : 'fallback_secret_key_for_dev_only';
    
    const decoded = jwt.verify(token as string, secretKey) as unknown as { id: string; email: string };
    req.admin = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
  }
};
