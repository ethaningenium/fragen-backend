import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const question = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  quizType: z.string(),
  withOwnAnswer: z.boolean(),
  variants: z.string(),
});

const quizUpdate = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  questions: z.array(question),
});

const quizCreate = z.object({
  title: z.string(),
  description: z.string(),
});

export type quizCreateType = z.infer<typeof quizCreate>;
export type quizUpdateType = z.infer<typeof quizUpdate>;
export type questionType = z.infer<typeof question>;

export const quizCreateValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    quizCreate.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid data' });
  }
};
export const quizUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    quizUpdate.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid data update' });
  }
};
