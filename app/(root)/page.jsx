import { auth } from '@/lib/auth'
import React from 'react'
import HomeClient from './HomeClient'
import { SessionProvider } from 'next-auth/react'

async function HomePage() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <HomeClient />
    </SessionProvider>
  )
}

export default HomePage