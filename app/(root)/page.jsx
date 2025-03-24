import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Home() {
  return (
    <main className='flex flex-col bg-dark-3 rounded-t-3xl'>
      {/* TODO: Make the below div a separate component */}
      <div className="flex flex-row w-full gap-3 px-6 py-3 ">
        <Image src="/dummy_user.jpg" alt='user profile image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-between items-center">
            <p className='font-medium text-white'>username</p>

            <Button size="icon" className="h-9 w-9 rounded-full hover:bg-dark-6 cursor-pointer">
              <Image src="/more.svg" alt="more options" height={18} width={18} />
            </Button>
          </div>

          <p className='whitespace-pre-line text-white'>
            {`Remember:

            No results? - Keep working
            Bad results? - Keep working
            Good results? - Keep working`}
          </p>
        </div>
      </div>
      
      <span className='h-0.25 bg-dark-6' />
    </main>
  )
}

export default Home