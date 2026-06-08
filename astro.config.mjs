import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import { loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const mode = process.env.NODE_ENV ?? 'development'
const rawEnv = loadEnv(mode, process.cwd(), '')

const env = {
  ...process.env,
  ...rawEnv
}

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().min(1)
})

const clientEnvSchema = z.object({
  PUBLIC_APP_NAME: z.string().min(1),
  PUBLIC_APP_URL: z.url()
})

const serverParsed = serverEnvSchema.safeParse(env)

if (!serverParsed.success) {
  console.error(z.treeifyError(serverParsed.error))
  throw new Error('Invalid server env')
}

const clientParsed = clientEnvSchema.safeParse(env)

if (!clientParsed.success) {
  console.error(z.treeifyError(clientParsed.error))
  throw new Error('Invalid client env')
}

console.log('ASTRO CONFIG LOADED')

export default defineConfig({
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
})
