import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function ThreadCard({ username, userImage, content, likesCount, commentsCount, retweetsCount }) {
    return (
        <>
            <div className="flex flex-row w-full gap-3 px-6 py-3 ">
                <Image src={userImage} alt='user profile image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full justify-between items-start">
                        <p className='font-medium text-white'>{username}</p>

                        <Button size="icon" className="h-9 w-9 rounded-full hover:bg-dark-6 cursor-pointer">
                            <Image src="/more.svg" alt="more options" height={20} width={20} />
                        </Button>
                    </div>

                    <p className='whitespace-pre-line text-white'>
                        {content}
                    </p>

                    <div className="flex justify-start mt-1 -ml-2">
                        <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                            <Image src="/heart-gray.svg" alt="like icon" height={20} width={20} />
                            {likesCount > 0 && (
                                <p className='text-subtle-medium text-gray-2'>
                                    {likesCount}
                                </p>
                            )}
                        </Button>

                        <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                            <Image src="/reply.svg" alt="comment icon" height={20} width={20} />
                            {commentsCount > 0 && (
                                <p className='text-subtle-medium text-gray-2'>
                                    {commentsCount}
                                </p>
                            )}
                        </Button>

                        <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer">
                            <Image src="/repost.svg" alt="repost icon" height={20} width={20} />
                            {retweetsCount > 0 && (
                                <p className='text-subtle-medium text-gray-2'>
                                    {retweetsCount}
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
    )
}

export default ThreadCard