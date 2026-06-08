import z from 'zod'
import { serverEnvSchema } from '~/config/env/env.schema'

const parsed = serverEnvSchema.safeParse(process.env)

if (!parsed.success) {
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid server environment variables')
}

export const serverEnv = parsed.data
