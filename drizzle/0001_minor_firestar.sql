PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_listings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`location` text,
	`latitude` real,
	`longitude` real,
	`image` text,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT 1747398025630,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_listings`("id", "title", "description", "price", "location", "latitude", "longitude", "image", "user_id", "created_at") SELECT "id", "title", "description", "price", "location", "latitude", "longitude", "image", "user_id", "created_at" FROM `listings`;--> statement-breakpoint
DROP TABLE `listings`;--> statement-breakpoint
ALTER TABLE `__new_listings` RENAME TO `listings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sender_id` text NOT NULL,
	`receiver_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT 1747398025630,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "sender_id", "receiver_id", "content", "created_at") SELECT "id", "sender_id", "receiver_id", "content", "created_at" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
CREATE TABLE `__new_reservations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`listing_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`guests` integer NOT NULL,
	`total_price` real NOT NULL,
	`status` text DEFAULT 'confirmed',
	`cancellation_reason` text,
	`created_at` integer DEFAULT 1747398025630,
	FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_reservations`("id", "listing_id", "user_id", "start_date", "end_date", "guests", "total_price", "status", "cancellation_reason", "created_at") SELECT "id", "listing_id", "user_id", "start_date", "end_date", "guests", "total_price", "status", "cancellation_reason", "created_at" FROM `reservations`;--> statement-breakpoint
DROP TABLE `reservations`;--> statement-breakpoint
ALTER TABLE `__new_reservations` RENAME TO `reservations`;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`listing_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`rating` real NOT NULL,
	`comment` text,
	`created_at` integer DEFAULT 1747398025630,
	FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "listing_id", "user_id", "rating", "comment", "created_at") SELECT "id", "listing_id", "user_id", "rating", "comment", "created_at" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`image` text,
	`role` text DEFAULT 'client',
	`created_at` integer DEFAULT 1747398025629
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "image", "role", "created_at") SELECT "id", "email", "name", "image", "role", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE TABLE `__new_wishlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT 1747398025630,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_wishlists`("id", "name", "user_id", "created_at") SELECT "id", "name", "user_id", "created_at" FROM `wishlists`;--> statement-breakpoint
DROP TABLE `wishlists`;--> statement-breakpoint
ALTER TABLE `__new_wishlists` RENAME TO `wishlists`;