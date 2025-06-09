import { SessionProvider } from 'next-auth/react'
import React from 'react'
import ProfileClient from './ProfileClient'
import { auth } from '@/lib/auth'

async function ProfilePage({ params }) {
  const session = await auth()

  const { username } = await params

  return (
    <SessionProvider session={session}>
      <ProfileClient username={username} />
    </SessionProvider>
  )
}

export default ProfilePage