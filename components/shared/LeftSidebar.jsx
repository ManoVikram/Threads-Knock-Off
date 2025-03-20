import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LeftSidebarItem from './LeftSidebarItem'

function LeftSidebar() {
  return (
    <div className="leftsidebar">
      <div className='px-4.5 py-3'>
        <Link href='/' className='flex items-center'>
          <Image src='/threads-logo-white.svg' alt='logo' width={28} height={28} className='transition-transform duration-200 hover:scale-110' />
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <LeftSidebarItem icon='/home.svg' navigateToPath="/" isProtected={false} />

        <LeftSidebarItem icon='/search.svg' navigateToPath="/search" isProtected={false} />

        <LeftSidebarItem icon='/add.svg' navigateToPath="/create" />

        <LeftSidebarItem icon='/heart.svg' navigateToPath="/likes" />

        <LeftSidebarItem icon='/user.svg' navigateToPath="/profile" />
      </div>


      <div className="flex flex-col gap-3">
        <LeftSidebarItem icon='/pin.svg' navigateToPath="/pinned" />

        <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg">
          <Link href='/menu' className='flex items-center'>
            <Image src='/menu.svg' alt='likes icon' width={28} height={28} />
          </Link>
        </div>
        {/* <LeftSidebarItem icon='/menu.svg' navigateToPath="/menu" /> */}
      </div>
    </div>
  )
}

export default LeftSidebar
