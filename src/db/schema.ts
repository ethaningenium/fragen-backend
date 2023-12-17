import { pgTable, serial, varchar, uuid, boolean, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
  id: serial('id').primaryKey().unique(),
  fullname: varchar('fullname', { length: 256 }),
  email: varchar('email', { length: 256 }).unique(),
  password: varchar('password', { length: 256 }),
  avatarurl: varchar('avatarurl', { length: 1000 }),
  premium: boolean('premium').default(false),
});

export const quiz = pgTable('quiz', {
  id: serial('id').primaryKey().unique(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 1000 }),
  createdat: timestamp('createdat').defaultNow(),
  authorid: integer('authorid'),
});

export const question = pgTable('question', {
  id: serial('id').primaryKey().unique(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 1000 }),
  type: varchar('type', { length: 100 }),
  ownanswer: boolean('ownanswer').default(false),
  choice: varchar('choice', { length: 3200 }),
  createdat: timestamp('createdat').defaultNow(),
  quizid: integer('quizid'),
});

export const userRelations = relations(user, ({ many }) => ({
  quiz: many(quiz),
}));

export const quizRelations = relations(quiz, ({ one, many }) => ({
  author: one(user, {
    fields: [quiz.authorid],
    references: [user.id],
  }),
  question: many(question),
}));

export const questionRelations = relations(question, ({ one }) => ({
  quiz: one(quiz, {
    fields: [question.quizid],
    references: [quiz.id],
  }),
}));
