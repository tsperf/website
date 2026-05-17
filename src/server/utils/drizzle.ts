import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle (event: H3Event) {
  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({ statusCode: 500, statusMessage: 'D1 binding `DB` is not available on this request' })
  }
  return drizzle(db, { schema })
}

export type Subscriber = typeof schema.subscribers.$inferSelect
