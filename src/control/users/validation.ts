import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const userSchemeRegister = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().min(8),
});

const userSchemeLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type userRequestLogin = z.infer<typeof userSchemeLogin>;
export type userRequestRegister = z.infer<typeof userSchemeRegister>;

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchemeRegister.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid data' });
  }
};

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchemeLogin.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid data' });
  }
};
