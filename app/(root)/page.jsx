"use client"

import ThreadCard from '@/components/cards/ThreadCard'
import Bottombar from '@/components/shared/Bottombar'
import { getAllThreads } from '@/lib/actions/threadActions'
import useThreadStore from '@/lib/store/threadStore'
import React, { useEffect } from 'react'

function HomePage() {
  const { threads, setThreads } = useThreadStore();

  useEffect(() => {
    async function fetchThreads() {
      const allThreadsData = await getAllThreads();
      console.log(allThreadsData);

      setThreads(allThreadsData);
    }

    fetchThreads();
  }, [setThreads]);

  return (
    <main className='flex flex-col bg-dark-3 rounded-t-3xl mb-9'>
      {threads.map((thread) => (
        <ThreadCard key={thread?.id} username={thread?.user?.username} userImage={thread?.user?.image} content={thread?.content} likesCount={thread?.likes_count} commentsCount={thread?.comments_count} retweetsCount={thread?.retweets_count} />
      ))}
    </main>
  )
}

export default HomePage