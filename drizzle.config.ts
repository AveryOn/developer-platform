import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './site.sqlite'
  }
})