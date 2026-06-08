import z from 'zod'
import { clientEnvSchema } from '~/config/env/env.schema'

const parsed = clientEnvSchema.safeParse({
  PUBLIC_APP_NAME: import.meta.env.PUBLIC_APP_NAME,
  PUBLIC_APP_URL: import.meta.env.PUBLIC_APP_URL
})

if (!parsed.success) {
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid client environment variables')
}

export const clientEnv = parsed.data
