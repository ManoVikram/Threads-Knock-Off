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
      console.log(allThreadsData);
      
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
                  <Image src="/more.svg" alt="more options" height={20} width={20} />
                </Button>
              </div>

              <p className='whitespace-pre-line text-white'>
                {thread?.content}
              </p>

              <div className="flex justify-start mt-1 -ml-2">
                <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                  <Image src="/heart-gray.svg" alt="like icon" height={20} width={20} />
                  {thread?.likes_count > 0 && (
                    <p className='text-subtle-medium text-gray-2'>
                      {thread?.likes_count}
                    </p>
                  )}
                </Button>

                <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                  <Image src="/reply.svg" alt="comment icon" height={20} width={20} />
                  {thread?.comments_count > 0 && (
                    <p className='text-subtle-medium text-gray-2'>
                      {thread?.comments_count}
                    </p>
                  )}
                </Button>
                
                <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                  <Image src="/repost.svg" alt="repost icon" height={20} width={20} />
                  {thread?.retweets_count > 0 && (
                    <p className='text-subtle-medium text-gray-2'>
                      {thread?.retweets_count}
                    </p>
                  )}
                </Button>

                <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                  <Image src="/share.svg" alt="share icon" height={20} width={20} />
                </Button>
              </div>
            </div>
          </div>


          <span className='h-0.5 bg-dark-6' />
        </>
      ))}

    </main>
  )
}

export default HomePage