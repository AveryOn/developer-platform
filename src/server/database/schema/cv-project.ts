import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { id } from '~/server/database/helpers'

export const cvProfileTable = sqliteTable('cv_profile', {
  id: id(),

  language: text('language', {
    enum: ['en', 'ru']
  }).notNull(),

  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),

  title: text('title').notNull(),
  location: text('location'),

  summary: text('summary').notNull(),

  email: text('email'),
  phone: text('phone'),

  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),

  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})
