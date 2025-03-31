import EditProfileDialogPopup from '@/components/forms/EditProfileDialogPopup'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import { redirect } from 'next/navigation'

async function EditProfilePage() {
    const session = await auth()

    if (!session) redirect("/")

    // If an existing user (has a username), redirect them back
    if (session.user.username) redirect("/profile");

    return (
        <SessionProvider session={session}>
            <EditProfileDialogPopup />
        </SessionProvider>
    )
}

export default EditProfilePage
