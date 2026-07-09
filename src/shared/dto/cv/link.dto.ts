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
})
export type CreateCvLinkDto = z.infer<typeof createCvLinkDto>


export interface CreateLinkResponse {
  newLink: Link,
  shiftedLinks: {
    id: string,
    order: number,
  }
}
