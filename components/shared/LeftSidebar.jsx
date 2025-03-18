import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

function LeftSidebar() {
  return (
    <div className="leftsidebar">
      <div className='px-4.5 py-3'>
        <Link href='/' className='flex items-center'>
          <Image src='/threads-logo-white.svg' alt='logo' width={28} height={28} className='transition-transform duration-200 hover:scale-110' />
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/' className='flex items-center'>
            <Image src='/home.svg' alt='home icon' width={28} height={28} />
          </Link>
        </div>

        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/search' className='flex items-center'>
            <Image src='/search.svg' alt='search icon' width={28} height={28} />
          </Link>
        </div>

        <div className="relative bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/create' className='flex items-center'>
            <span className='absolute inset-0'></span>
            <Image src='/add.svg' alt='add icon' width={28} height={28} />
          </Link>
        </div>

        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/likes' className='flex items-center'>
            <Image src='/heart.svg' alt='likes icon' width={28} height={28} />
          </Link>
        </div>

        {/* TODO: Make it a component */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg cursor-pointer">
              <Image src='/user.svg' alt='likes icon' width={28} height={28} />
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[520px] px-14 py-16 flex flex-col justify-center items-center bg-dark-4 border-none rounded-3xl [&>button]:hidden">
            <DialogHeader>
              <DialogTitle asChild>
                <div className="text-heading1-bold text-white text-center">
                  Say more with Threads
                </div>
              </DialogTitle>

              <DialogDescription className="text-center">
                Join Threads to share thoughts, find out what's going on, follow your people and more.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button className="mt-8 p-5 h-full gap-14 bg-dark-4 border-3 border-dark-3 rounded-2xl cursor-pointer">
                <Image src="/google-logo.svg" alt='google logo' width={48} height={48} />

                <p className='text-base1-semibold'>Continue with Google</p>

                <Image src="/right-arrow.svg" alt='right arrow icon' width={16} height={16} />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      <div className="flex flex-col gap-3">
        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/pinned' className='flex items-center'>
            <Image src='/pin.svg' alt='likes icon' width={28} height={28} />
          </Link>
        </div>

        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/menu' className='flex items-center'>
            <Image src='/menu.svg' alt='likes icon' width={28} height={28} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
