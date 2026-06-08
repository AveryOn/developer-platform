import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import { fileURLToPath } from 'node:url'
import z from 'zod'
import { serverEnvSchema } from '~/config/env'

const validateEnv = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')

  const extendedEnv = {
    ...process.env,
    ...env
  }

  const serverParsed = serverEnvSchema.safeParse(extendedEnv)

  if (!serverParsed.success) {
    console.error(z.treeifyError(serverParsed.error))
    throw new Error('Invalid server env')
  }

  const clientParsed = clientEnvSchema.safeParse(extendedEnv)

  if (!clientParsed.success) {
    console.error(z.treeifyError(clientParsed.error))
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
