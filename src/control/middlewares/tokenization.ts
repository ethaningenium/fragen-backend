import jwt from 'jsonwebtoken';

type tokenType = {
  id: string;
};

export const newToken = (id: number) => {
  const token = jwt.sign(
    {
      id: id,
    },
    'a1a2b3b4',
    {
      expiresIn: '30d',
    },
  );
  return token;
};
