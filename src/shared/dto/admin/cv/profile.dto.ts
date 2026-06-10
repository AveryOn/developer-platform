import { z } from 'zod'
import { ProfileLanguages } from '~/shared/types'

export const createCvProfileDto = z.object({
  language: z.enum(ProfileLanguages),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  title: z.string().trim().min(1),
  location: z.string().trim().optional().nullable(),
  summary: z.string().trim().min(1),
  email: z.email().optional().nullable(),
  phone: z.string().trim().optional().nullable(),
  isActive: z.boolean().optional().default(false),
})

export type CreateCvProfileDto = z.infer<typeof createCvProfileDto>

