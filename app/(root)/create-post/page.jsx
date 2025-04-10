import React from 'react'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CreateAPostDialogPopup from '@/components/forms/CreateAPostDialogPopup';
import { SessionProvider } from 'next-auth/react';

async function CreatePostPage() {
  const session = await auth()

  if (!session) redirect("/")

  return (
    <SessionProvider session={session}>
      <CreateAPostDialogPopup />
    </SessionProvider>
  )
}

export default CreatePostPage