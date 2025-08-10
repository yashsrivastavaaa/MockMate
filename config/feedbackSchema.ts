import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const feedbackSchema = pgTable('feedback', {
    id: serial('id').primaryKey(),
    user_id: varchar('user_id', { length: 50 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    communication: varchar('communication', { length: 10 }).default('0'),
    technical: varchar('technical', { length: 10 }).default('0'),
    problem_solving: varchar('problem_solving', { length: 10 }).default('0'),
    cultural_fit: varchar('cultural_fit', { length: 10 }).default('0'),
    confidence: varchar('confidence', { length: 10 }).default('0'),
    summary: varchar('summary', { length: 1000 }),
    suggestions: varchar('suggestions', { length: 2000 }),
    created_at: varchar('created_at', { length: 50 }).default(sql`CURRENT_TIMESTAMP::text`),
});
