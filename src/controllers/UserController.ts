import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      password: hash,
    });

    const doc = await createdUser.save();
    const user = doc.toObject();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    const { password: Pass, ...userData } = user;

    res.json({ token, ...userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'регистрация не удалось',
    });
  }
};
