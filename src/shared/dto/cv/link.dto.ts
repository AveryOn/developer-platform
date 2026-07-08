import z from 'zod'
import type { cvProfileLinkTable } from '~/server/database/schema'
import { SocialNetwork } from '~/shared/types'

export type Link = typeof cvProfileLinkTable.$inferSelect
export type LinkInput = typeof cvProfileLinkTable.$inferInsert

export const createCvLinkDto = z.object({
  profileId: z.uuid(),
  type: z.enum(SocialNetwork),
  label: z.string().trim().min(3),
  url: z.url(),
  order: z.number().min(0),
  isVisible: z.boolean().default(true),
})
export type CreateCvLinkDto = z.infer<typeof createCvLinkDto>
