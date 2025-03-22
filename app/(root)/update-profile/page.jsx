import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function UpdateProfile() {
    const session = await auth()

    if (!session) redirect("/")

    return (
        <div className='text-white'>{session.user.username}</div>
    )
}

export default UpdateProfile