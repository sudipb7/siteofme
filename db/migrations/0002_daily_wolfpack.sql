CREATE TYPE "public"."alignment_enum" AS ENUM('left', 'center', 'right');--> statement-breakpoint
CREATE TYPE "public"."size_enum" AS ENUM('S', 'M', 'L');--> statement-breakpoint
CREATE TABLE "sites" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"user_id" text NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"color" text NOT NULL,
	"background_color" text NOT NULL,
	"text_align" "alignment_enum" NOT NULL,
	"font_family" text NOT NULL,
	"font_size" "size_enum" NOT NULL,
	"content" text NOT NULL,
	"social_icons" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"social_icons_alignment" "alignment_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username_verified" timestamp;--> statement-breakpoint
ALTER TABLE "sites" ADD CONSTRAINT "sites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;