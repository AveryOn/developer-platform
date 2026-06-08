import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import { fileURLToPath } from 'node:url'

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  DATABASE_URL: z.string().min(1)
})

const clientEnvSchema = z.object({
  PUBLIC_APP_NAME: z.string().min(1),
  PUBLIC_APP_URL: z.string().url()
})

const validateEnv = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')

  const mergedEnv = {
    ...process.env,
    ...env
  }

  const serverParsed = serverEnvSchema.safeParse(mergedEnv)

  if (!serverParsed.success) {
    console.error(serverParsed.error.format())
    throw new Error('Invalid server env')
  }

  const clientParsed = clientEnvSchema.safeParse(mergedEnv)

  if (!clientParsed.success) {
    console.error(clientParsed.error.format())
    throw new Error('Invalid client env')
  }
}

export default defineConfig(({ mode }) => {
  validateEnv(mode)

  return {
    output: 'server',
    adapter: node({
      mode: 'standalone'
    }),
    integrations: [vue()],
    vite: {
      resolve: {
        alias: {
          '~': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  }
})
