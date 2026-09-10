CREATE TABLE `second_opinion_files` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `second_opinion_submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `second_opinion_object_key_idx` ON `second_opinion_files` (`object_key`);--> statement-breakpoint
CREATE INDEX `second_opinion_files_submission_idx` ON `second_opinion_files` (`submission_id`);--> statement-breakpoint
CREATE INDEX `second_opinion_files_expires_idx` ON `second_opinion_files` (`expires_at`);--> statement-breakpoint
CREATE TABLE `second_opinion_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`zip` text NOT NULL,
	`service` text NOT NULL,
	`details` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`consent_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `second_opinion_reference_idx` ON `second_opinion_submissions` (`reference`);--> statement-breakpoint
CREATE INDEX `second_opinion_expires_idx` ON `second_opinion_submissions` (`expires_at`);