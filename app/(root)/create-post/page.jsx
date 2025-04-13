import React from 'react'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CreateAPostDialogPopup from '@/components/forms/CreateAPostDialogPopup';
import { SessionProvider } from 'next-auth/react';

async function CreatePostPage({ searchParams }) {
  const session = await auth()

  if (!session) redirect("/")

  const { parentThreadID } = await searchParams

  return (
    <SessionProvider session={session}>
      <CreateAPostDialogPopup parentThreadID={parentThreadID} isAComment={!!parentThreadID} />
    </SessionProvider>
  )
}

export default CreatePostPage