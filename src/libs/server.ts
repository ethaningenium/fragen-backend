import express from 'express';
import cors from 'cors';
import { db } from '../db/index';
import { migrate } from 'drizzle-orm/neon-http/migrator';

export default async function serverStart() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const port = 8000;

  await migrate(db, { migrationsFolder: './migrations' });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  return app;
}
