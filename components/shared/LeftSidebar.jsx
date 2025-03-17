import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/likes' className='flex items-center'>
            <Image src='/user.svg' alt='likes icon' width={28} height={28} />
          </Link>
        </div>
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