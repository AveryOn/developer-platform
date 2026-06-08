import { z } from 'zod'

export const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  DATABASE_URL: z.string().min(1)
})

export const clientEnvSchema = z.object({
  PUBLIC_APP_NAME: z.string().min(1),
  PUBLIC_APP_URL: z.url()
})

export const envSchema = serverEnvSchema.extend(clientEnvSchema)
