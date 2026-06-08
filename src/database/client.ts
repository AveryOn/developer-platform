import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { serverEnv } from '~/config/env'

const sqlite = new Database(serverEnv.DATABASE_URL)

export const db = drizzle(sqlite)
