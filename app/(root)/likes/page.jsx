import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import LikesClient from './LikesClient'

async function LikesPage() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <LikesClient />
    </SessionProvider>
  )
}

export default LikesPage