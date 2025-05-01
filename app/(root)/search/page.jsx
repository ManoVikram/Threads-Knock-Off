import SearchComponent from '@/components/shared/SearchComponent'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

async function SearchPage() {
    const session = await auth()

    return (
        <main className="flex flex-col h-screen items-center justify-start bg-dark-3 rounded-t-3xl p-6">
            <SessionProvider session={session}>
                <SearchComponent />
            </SessionProvider>
        </main>
    )
}

export default SearchPage