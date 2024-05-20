import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/server/database/schema.ts',
  out: './src/server/database/migrations',
})
