CREATE TABLE `tour_start_dates` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`date` text NOT NULL,
	`tour_id` text NOT NULL,
	FOREIGN KEY (`tour_id`) REFERENCES `tours`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tours` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`duration` integer NOT NULL,
	`max_group_size` integer NOT NULL,
	`difficulty` text DEFAULT 'moderate' NOT NULL,
	`ratings_average` integer DEFAULT 0,
	`ratings_qty` integer DEFAULT 0,
	`price` integer NOT NULL,
	`discount` integer,
	`summary` text NOT NULL,
	`description` text,
	`is_featured` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tours_name_unique` ON `tours` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tours_slug_unique` ON `tours` (`slug`);