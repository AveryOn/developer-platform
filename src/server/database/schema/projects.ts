import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { id, timestamp } from '~/server/database/helpers'

export const projectsTable = sqliteTable('project', {
  id: id(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  stack: text('stack').notNull(),
  updatedAt: timestamp('updated_at', true),
  createdAt: timestamp('created_at', true)
})
