export default defineEventHandler(async event => {
  const { email } = await readBody(event)

  const [user] = await useDrizzle().select().from(tables.subscribers).where(eq(tables.subscribers.email, email))

  if (!user) {
    await useDrizzle().insert(tables.subscribers).values({
      email: email,
      subscriptions: JSON.stringify(['waitlist']),
      createdAt: new Date(),
    })
  }

  return null
})
