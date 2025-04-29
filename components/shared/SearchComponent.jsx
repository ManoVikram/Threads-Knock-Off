"use client"

import { search } from '@/lib/actions/searchActions'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function SearchComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        if (!searchQuery) return

        const debounceTimer = setTimeout(async () => {
            setIsLoading(true)
            const data = await search(searchQuery)
            setSearchResults(data)
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(debounceTimer)
    }, [searchQuery])


    return (
        <>
            <div className="flex w-full bg-dark-2 rounded-4xl px-5 py-2">
                <Image src="/search.svg" width={16} height={16} />

                <Input type="text" id="search" placeholder="Search" className="w-full text-white px-3 py-4 selection:bg-blue-400 selection:text-black border-none outline-none focus-visible:ring-0" onChange={(event) => setSearchQuery(event.target.value)} />
            </div>

            {isLoading && <Loader2 className="animate-spin text-white mt-20" />}

            {searchResults?.posts?.map((post) => (
                <p>{post.content}</p>
            ))}

            {searchResults?.users?.map((user) => (
                <p>{user.name}</p>
            ))}
        </>
    )
}

export default SearchComponent