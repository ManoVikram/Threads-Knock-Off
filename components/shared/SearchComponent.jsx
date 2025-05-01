"use client"

import { search } from '@/lib/actions/searchActions'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ThreadCard from '../cards/ThreadCard'

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
                <Image src="/search.svg" alt='search-icon' width={16} height={16} />

                <Input type="text" id="search" placeholder="Search" className="w-full text-white px-3 py-4 selection:bg-blue-400 selection:text-black border-none outline-none focus-visible:ring-0" onChange={(event) => setSearchQuery(event.target.value)} />
            </div>

            {isLoading && <Loader2 className="animate-spin text-white mt-20" />}

            {searchResults?.posts?.slice(0, 5)?.map((post) => (
                <ThreadCard key={post.id} postID={post.id} username={post.user.id} userImage={post.user.image} content={post.content} createdAt={post.created_at} />
            ))}

            {searchResults?.users?.slice(0, 5)?.map((user) => (
                <div key={user.id} className="flex flex-row w-full gap-3 px-6 pt-6 py-2 cursor-pointer">
                    <Image src={user.image} alt='user-image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

                    <div className="flex flex-col justify-start items-start gap-1.5">
                        <p className='font-medium text-white leading-3 m-0'>{user.name}</p>

                        <p className='text-gray-2'>{user.username}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchComponent