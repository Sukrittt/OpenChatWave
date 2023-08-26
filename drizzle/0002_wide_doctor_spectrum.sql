CREATE TABLE `message` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`text` varchar(191) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `message_id` PRIMARY KEY(`id`)
);
