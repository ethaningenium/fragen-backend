import express from 'express';
import mongoose from 'mongoose';
import * as userControl from './controllers/UserController';

const app = express();
app.use(express.json());
const port = 8000;

mongoose
  .connect(
    'mongodb+srv://xvii1103:T4Ptjpge6zcRdbax@train.h5aiaqn.mongodb.net/quizapp?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('mongodb works');
  })
  .catch(() => {
    console.log('catch');
  });

app.post('/', (req, res) => {
  res.send('ich bin pidor');
});
app.post('/register', userControl.register);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
