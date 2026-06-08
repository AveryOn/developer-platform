import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const projectsTable = sqliteTable('project', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  stack: text('stack').notNull(),
  createdAt: text('created_at').notNull()
})