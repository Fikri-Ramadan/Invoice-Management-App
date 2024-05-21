import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const authValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password Required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const newClientValidator = [
  body('name').notEmpty().withMessage('Name Required'),
  body('email').isEmail().withMessage('Invalid email'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];