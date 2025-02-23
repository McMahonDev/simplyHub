import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	createdAt: text('createdAt').notNull().default('now()'),
	updatedAt: text('updatedAt').notNull().default('now()'),
	verified: boolean('verified').notNull().default(false),
	firstName: text('firstName').notNull(),
	lastName: text('lastName').notNull()
});
