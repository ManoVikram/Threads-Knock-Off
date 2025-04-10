"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { handleThreadComment, handleThreadLikes } from '@/lib/actions/threadActions'
import { useSession } from 'next-auth/react'
import useLoginPopupStore from '@/lib/store/loginPopupStore'
import useCreatePostPopupStore from '@/lib/store/createPostPopupStore'

function ThreadCard({ postID, username, userImage, content, likesCount: initialLikesCount, commentsCount: initialCommentsCount, retweetsCount: initialRetweetsCount, likedByUser }) {
    const { data: session } = useSession()
    const { setShowLoginPopup } = useLoginPopupStore()
    const { setShowCreatePostPopup, setParentThreadID } = useCreatePostPopupStore()

    const [isLiked, setIsLiked] = useState(likedByUser)
    const [likesCount, setLikesCount] = useState(initialLikesCount)
    const [commentsCount, setCommentsCount] = useState(initialCommentsCount)
    const [retweetsCount, setRetweetsCount] = useState(initialRetweetsCount)

    const handleLikeClick = async () => {
        if (!session) {
            setShowLoginPopup(true)
            return
        }

        setIsLiked(prev => !prev);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        const success = await handleThreadLikes(postID, session.sessionToken);
        if (!success) {
            // rollback on failure
            setIsLiked(prev => !prev);
            setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
        }
    }

    const handleCommentClick = async () => {
        if (!session) {
            setShowLoginPopup(true);
            return;
        }

        setShowCreatePostPopup(true);
        setParentThreadID(postID)
        setCommentsCount(prev => prev + 1);

        const success = await handleThreadComment(postID, session.sessionToken);
        if (!success) {
            // rollback on failure
            setCommentsCount(prev => prev - 1);
        }
    }


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
                        <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer" onClick={handleLikeClick}>
                            <Image src={isLiked ? "/heart-filled.svg" : "/heart-gray.svg"} alt="like icon" height={20} width={20} />
                            {likesCount > 0 && (
                                <p className='text-subtle-medium text-gray-2'>
                                    {likesCount}
                                </p>
                            )}
                        </Button>

                        <Button className="p-2 rounded-full hover:bg-dark-6 cursor-pointer" onClick={handleCommentClick}>
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