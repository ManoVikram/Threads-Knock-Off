"use client"

import { Button } from '@/components/ui/button'
import { getAllThreads } from '@/lib/actions/threadActions'
import useThreadStore from '@/lib/store/threadStore'
import Image from 'next/image'
import React, { useEffect } from 'react'

function HomePage() {
  const { threads, setThreads } = useThreadStore();

  useEffect(() => {
    async function fetchThreads() {
      const allThreadsData = await getAllThreads();
      setThreads(allThreadsData);
    }

    fetchThreads();
  }, [setThreads]);

  return (
    <main className='flex flex-col bg-dark-3 rounded-t-3xl'>

      {threads.map((thread) => (
        <>
          <div className="flex flex-row w-full gap-3 px-6 py-3 ">
            <Image src="/dummy_user.jpg" alt='user profile image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full justify-between items-start">
                <p className='font-medium text-white'>{thread?.user?.username}</p>

                <Button size="icon" className="h-9 w-9 rounded-full hover:bg-dark-6 cursor-pointer">
                  <Image src="/more.svg" alt="more options" height={18} width={18} />
                </Button>
              </div>

              <p className='whitespace-pre-line text-white'>
                {thread?.content}
              </p>
            </div>
          </div>

          <span className='h-0.25 bg-dark-6' />
        </>
      ))}

    </main>
  )
}

export default HomePage