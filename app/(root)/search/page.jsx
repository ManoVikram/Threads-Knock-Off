import SearchComponent from '@/components/shared/SearchComponent'
import React from 'react'

function SearchPage() {
    return (
        <main className="flex flex-col h-screen items-center justify-start bg-dark-3 rounded-t-3xl p-6">
            <SearchComponent />
        </main>
    )
}

export default SearchPage