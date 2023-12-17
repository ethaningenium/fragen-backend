import { Express } from 'express';
import serverStart from './libs/server';
import { userStart } from './control/users/routes';
import { quizStart } from './control/quiz/route';


async function main() {
  const app = await serverStart();
  mainget(app);
  userStart(app);
  quizStart(app);
}

function mainget(app: Express) {
  app.get('/', (req, res) => {
    res.json('ich bin pidor');
  });
}

main();

// app.post('/register', userValidations.registerValidation, userControl.register); //Регистрация
// app.post('/login', userValidations.loginValidation, userControl.login); //Логин
// app.get('/getme', checkAuth, userControl.getMe); //Получение юзера по JWT token

// app.get('/quiz', checkAuth, quizControllers.getAllQuiz); //Получение всех quiz у юзера по JWT token
// app.post('/quiz', quizValidations.quizCreateValidator, checkAuth, quizControllers.createQuiz); // Создание quiz по JWT token /без questions
// app.patch('/quiz', quizValidations.quizUpdateValidator, checkAuth, quizControllers.updateQuiz); //Обновдение quiz & questions

// app.get('/quiz/:id', checkAuth, quizControllers.getQuizById); //Получение полный quiz с questions по query params и JWT token
// app.get('/quiz/view/:id', AnswerControllers.viewCountAdd);

// app.delete('/quiz/:id', userControl.register);

// app.post('/test', checkAuth, TestControllers.updateQuiz); //Тестовой эндпойнт
