"use client"

import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function SearchPage() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <main className="flex flex-col h-screen items-center justify-start bg-dark-3 rounded-t-3xl p-6">
            <div className="flex w-full bg-dark-2 rounded-4xl px-5 py-2">
                <Image src="/search.svg" width={16} height={16} />

                <Input type="text" id="search" placeholder="Search" className="w-full text-white px-3 py-4 selection:bg-blue-400 selection:text-black border-none outline-none focus-visible:ring-0" />
            </div>

            {isLoading && <Loader2 className="animate-spin text-white mt-20" />}
        </main>
    )
}

export default SearchPage