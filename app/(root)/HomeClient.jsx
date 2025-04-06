"use client"

import ThreadCard from '@/components/cards/ThreadCard'
import { getAllThreads } from '@/lib/actions/threadActions'
import useThreadStore from '@/lib/store/threadStore'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function HomeClient() {
    const { data: session } = useSession()

    const { threads, setThreads } = useThreadStore();

    useEffect(() => {
        async function fetchThreads() {
            const allThreadsData = await getAllThreads(session?.sessionToken);
            setThreads(allThreadsData);
        }

        fetchThreads();
    }, [setThreads]);

    return (
        <main className='flex flex-col bg-dark-3 rounded-t-3xl mb-9'>
            {threads.map((thread) => (
                <ThreadCard key={thread?.id} postID={thread?.id} username={thread?.user?.username} userImage={thread?.user?.image} content={thread?.content} likesCount={thread?.likes_count} likedByUser={thread?.liked_by_user} commentsCount={thread?.comments_count} retweetsCount={thread?.retweets_count} />
            ))}
        </main>
    )
}

export default HomeClient