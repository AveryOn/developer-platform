import { serverEnvSchema } from './env.schema'

const parsed = serverEnvSchema.safeParse(process.env)

if (!parsed.success) {
  console.error(parsed.error.format())
  throw new Error('Invalid server environment variables')
}

export const serverEnv = parsed.data
