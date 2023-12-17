import { Express } from 'express';
import checkAuth from '../middlewares/checkAuth';
import { quizCreateValidator, quizUpdateValidator } from './validation';
import { create, getmy, update, getone } from "./controllers";

export function quizStart(app: Express) {
  app.post('/quiz', checkAuth, quizCreateValidator, create);
  app.get("/quiz/:id", checkAuth, getone);
  app.patch('/quiz', checkAuth, quizUpdateValidator, update);
  app.get('/quiz', checkAuth, getmy);
}
