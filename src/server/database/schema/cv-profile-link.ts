import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "~/server/database/helpers";
import { cvProfileTable } from "~/server/database/schema/cv-profile";
import { SocialNetwork } from "~/shared/types";


export const cvProfileLinks = sqliteTable('cv_profile_links', {
  id: id(),

  profileId: text('profile_id')
    .notNull()
    .references(() => cvProfileTable.id, { onDelete: 'cascade' }),

  type: text('type', {
    enum: [
      SocialNetwork.email,
      SocialNetwork.facebook,
      SocialNetwork.github,
      SocialNetwork.instagram,
      SocialNetwork.linkedin,
      SocialNetwork.reddit,
      SocialNetwork.telegram,
      SocialNetwork.website,
      SocialNetwork.x,
      SocialNetwork.other,
    ]
  }).notNull(),

  label: text('label').notNull(),
  url: text('url').notNull(),

  order: integer('order').notNull().default(0),

  createdAt: timestamp('created_at', true).notNull(),
  updatedAt: timestamp('updated_at', true).notNull()
})
