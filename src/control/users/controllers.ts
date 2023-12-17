import { Response, Request } from 'express';
import { eq } from 'drizzle-orm';
import { createHashedPassword, passwordCompare } from '../middlewares/hash';
import { db } from '../../db';
import { user } from '../../db/schema';
import { userRequestLogin, userRequestRegister } from './validation';
import { newToken } from '../middlewares/tokenization';
import checkAuth, { CustomRequest } from '../middlewares/checkAuth';

export const register = async (req: Request, res: Response) => {
  try {
    const body: userRequestRegister = req.body;
    const hashedPassword = await createHashedPassword(body.password);

    const users = await db
      .insert(user)
      .values({ fullname: body.fullname, email: body.email, password: hashedPassword })
      .returning();

    const token = newToken(users[0].id);
    const { password, ...userResponse } = users[0];

    return res.status(200).json({ token, ...userResponse });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ m: 'register error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body: userRequestLogin = req.body;

    const users = await db.select().from(user).where(eq(user.email, body.email));
    const compare = await passwordCompare(body.password, users[0].password);

    if (!compare) {
      return res.status(402).json({ m: 'password wrong' });
    }

    const token = newToken(users[0].id);
    const { password, ...userResponse } = users[0];

    return res.status(200).json({ token, ...userResponse });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ m: 'login error' });
  }
};

export const me = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const users = await db
      .select()
      .from(user)
      .where(eq(user.id, Number(userId)));

    const token = newToken(users[0].id);
    const { password, ...userResponse } = users[0];

    return res.status(200).json({ token, ...userResponse });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ m: 'some problem' });
  }
};
