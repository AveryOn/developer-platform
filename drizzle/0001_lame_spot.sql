PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cv_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`title` text NOT NULL,
	`location` text,
	`summary` text NOT NULL,
	`email` text,
	`phone` text,
	`is_active` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_cv_profile`("id", "language", "first_name", "last_name", "title", "location", "summary", "email", "phone", "is_active", "created_at", "updated_at", "deleted_at") SELECT "id", "language", "first_name", "last_name", "title", "location", "summary", "email", "phone", "is_active", "created_at", "updated_at", "deleted_at" FROM `cv_profile`;--> statement-breakpoint
DROP TABLE `cv_profile`;--> statement-breakpoint
ALTER TABLE `__new_cv_profile` RENAME TO `cv_profile`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_cv_project` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`title` text NOT NULL,
	`short_description` text NOT NULL,
	`description` text NOT NULL,
	`repository_url` text,
	`demo_url` text,
	`start_date` text,
	`end_date` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_cv_project`("id", "profile_id", "title", "short_description", "description", "repository_url", "demo_url", "start_date", "end_date", "is_featured", "order", "created_at", "updated_at", "deleted_at") SELECT "id", "profile_id", "title", "short_description", "description", "repository_url", "demo_url", "start_date", "end_date", "is_featured", "order", "created_at", "updated_at", "deleted_at" FROM `cv_project`;--> statement-breakpoint
DROP TABLE `cv_project`;--> statement-breakpoint
ALTER TABLE `__new_cv_project` RENAME TO `cv_project`;--> statement-breakpoint
CREATE TABLE `__new_cv_version` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`template_id` text NOT NULL,
	`version` integer NOT NULL,
	`title` text NOT NULL,
	`render_data` text NOT NULL,
	`rendered_html` text NOT NULL,
	`change_note` text,
	`status` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`published_at` text,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`template_id`) REFERENCES `cv_template`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_cv_version`("id", "profile_id", "template_id", "version", "title", "render_data", "rendered_html", "change_note", "status", "created_at", "published_at") SELECT "id", "profile_id", "template_id", "version", "title", "render_data", "rendered_html", "change_note", "status", "created_at", "published_at" FROM `cv_version`;--> statement-breakpoint
DROP TABLE `cv_version`;--> statement-breakpoint
ALTER TABLE `__new_cv_version` RENAME TO `cv_version`;