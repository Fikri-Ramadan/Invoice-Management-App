import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      dataUser: any;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).send('Token not found');
    }
    const verifiedToken: any = verify(token, process.env.SECRET_KEY as string);

    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        message: 'invalid token',
      });
    }

    req.dataUser = verifiedToken as User;
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).send('Token error');
  }
};