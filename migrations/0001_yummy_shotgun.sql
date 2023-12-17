ALTER TABLE "user" ADD COLUMN "avatarurl" varchar(1000);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "premium" boolean DEFAULT false;