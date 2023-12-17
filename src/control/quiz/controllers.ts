import { quiz, user, question } from '../../db/schema';
import { db } from '../../db';
import { CustomRequest } from '../middlewares/checkAuth';
import { Response } from 'express';
import { questionType, quizCreateType, quizUpdateType } from './validation';
import { eq } from 'drizzle-orm';

export const getone = async (req: CustomRequest, res: Response) =>{
  try {
    const id = req.params.id
    const quizs = await db
      .select()
      .from(quiz)
      .where(eq(quiz.id, Number(id)));
    const questions = await db
      .select()
      .from(question)
      .where(eq(question.quizid, Number(id)));
    return res.json({ ...quizs[0], questions });
  } catch (error) {
    console.log(error);
  }
}

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const userid = req.userId;
    const body: quizCreateType = req.body;

    const quizs = await db
      .insert(quiz)
      .values({ title: body.title, description: body.description, authorid: Number(userid) })
      .returning();

    return res.json({ ...quizs[0] });
  } catch (error) {
    return res.status(400).json({ m: 'something wrong' });
  }
};

export const update = async (req: CustomRequest, res: Response) => {
  try {
    const body: quizUpdateType = req.body;
    const quizs = await db
      .update(quiz)
      .set({ title: body.title, description: body.description })
      .where(eq(quiz.id, Number(body.id)))
      .returning();
    if (!quizs[0].title) {
      return res.status(400).json({ m: 'something wrong' });
    }
    deleteOld(body);
    const questions = await createquestions(body, quizs[0].id);

    return res.json({ ...quizs[0], questions });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ m: 'something wrong' });
  }
};

const deleteOld = async (body: quizUpdateType) => {
  const allQuestionsFromDB = await db
    .select()
    .from(question)
    .where(eq(question.quizid, Number(body.id)));

  const allQuestionsDB = allQuestionsFromDB.map((question) => question.id);
  const allQuestionsFromRequest = body.questions.map((question) => {
    return Number(question.id);
  });
  for (let i = 0; i < allQuestionsDB.length; i++) {
    if (!allQuestionsFromRequest.includes(allQuestionsDB[i])) {
      await db.delete(question).where(eq(question.id, allQuestionsDB[i]));
    }
  }
};

const createquestions = async (body: quizUpdateType, quizId: number) => {
  const questions = body.questions;
  const result = await Promise.all(
    questions.map(async (questioner) => {
      const updatedQuestion = await db
        .update(question)
        .set({
          title: questioner.title,
          description: questioner.description,
          type: questioner.quizType,
          ownanswer: questioner.withOwnAnswer,
          choice: questioner.variants,
        })
        .where(eq(question.id, Number(questioner.id)))
        .returning();
      if (updatedQuestion[0]?.title) {
        return updatedQuestion[0];
      } else {
        const createdQuestion = await db
          .insert(question)
          .values({
            title: questioner.title,
            description: questioner.description,
            type: questioner.quizType,
            ownanswer: questioner.withOwnAnswer,
            choice: questioner.variants,
            quizid: quizId,
          })
          .returning();
        return createdQuestion[0];
      }
    }),
  );
  return result;
};

export const getmy = async (req: CustomRequest, res: Response) => {
  try {
    const userid = req.userId;

    const quizs = await db
      .select()
      .from(quiz)
      .where(eq(quiz.authorid, Number(userid)));

    return res.json(quizs);
  } catch (error) {
    return res.status(400).json({ m: 'something wrong' });
  }
};
