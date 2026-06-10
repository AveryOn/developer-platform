CREATE TABLE `article` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `article_slug_unique` ON `article` (`slug`);--> statement-breakpoint
CREATE TABLE `cv_employment_type` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`language` text NOT NULL,
	`label` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cv_employment_type_code_unique` ON `cv_employment_type` (`code`);--> statement-breakpoint
CREATE TABLE `cv_experience_bullet` (
	`id` text PRIMARY KEY NOT NULL,
	`experience_id` text NOT NULL,
	`content` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`experience_id`) REFERENCES `cv_experience`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_experience_technology` (
	`id` text PRIMARY KEY NOT NULL,
	`experience_id` text NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`experience_id`) REFERENCES `cv_experience`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_experience` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`employment_type_id` text,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`location` text,
	`start_date` text NOT NULL,
	`end_date` text,
	`is_current` integer DEFAULT false NOT NULL,
	`description` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`employment_type_id`) REFERENCES `cv_employment_type`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `cv_language` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`name` text NOT NULL,
	`level` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_profile_link` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`url` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_profile` (
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
	`deleted_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cv_project_technology` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `cv_project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_project` (
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
	`deleted_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_skill_group` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_skill` (
	`id` text PRIMARY KEY NOT NULL,
	`skill_group_id` text NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`skill_group_id`) REFERENCES `cv_skill_group`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cv_template` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`language` text NOT NULL,
	`html` text NOT NULL,
	`css` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cv_template_slug_unique` ON `cv_template` (`slug`);--> statement-breakpoint
CREATE TABLE `cv_version` (
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
	`published_at` text NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `cv_profile`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`template_id`) REFERENCES `cv_template`(`id`) ON UPDATE no action ON DELETE cascade
);
