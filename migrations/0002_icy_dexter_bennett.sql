CREATE TABLE IF NOT EXISTS "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(1000),
	"type" varchar(100),
	"ownanswer" boolean DEFAULT false,
	"choice" varchar(3200),
	"quizid" integer,
	CONSTRAINT "question_id_unique" UNIQUE("id"),
	CONSTRAINT "question_quizid_unique" UNIQUE("quizid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(1000),
	"authorid" integer,
	CONSTRAINT "quiz_id_unique" UNIQUE("id"),
	CONSTRAINT "quiz_authorid_unique" UNIQUE("authorid")
);
