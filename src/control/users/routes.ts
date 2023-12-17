import { Express } from 'express';
import checkAuth from '../middlewares/checkAuth';
import { loginValidation, registerValidation } from './validation';
import { login, me, register } from './controllers';

export function userStart(app: Express) {
  app.post('/register', registerValidation, register); //Регистрация
  app.post('/login', loginValidation, login); //Логин
  app.get('/me', checkAuth, me); //Получение юзера по JWT token
}
