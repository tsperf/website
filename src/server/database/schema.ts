import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const subscribers = sqliteTable('subscribers', {
  email: text('email').primaryKey(),
  subscriptions: text('subscriptions'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
