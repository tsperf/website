export default defineEventHandler(async event => {
  const { email } = await readBody(event)

  const db = useDrizzle(event)

  const [user] = await db.select().from(tables.subscribers).where(eq(tables.subscribers.email, email))

  if (!user) {
    await db.insert(tables.subscribers).values({
      email: email,
      subscriptions: JSON.stringify(['waitlist']),
      createdAt: new Date(),
    })
  }

  return null
})
