import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { id, timestamp } from '~/server/database/helpers'

export const articles = sqliteTable('articles', {
  id: id(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  updatedAt: timestamp('updated_at', true),
  createdAt: timestamp('created_at', true)
})
