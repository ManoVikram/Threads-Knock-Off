"use client"

import ThreadCard from '@/components/cards/ThreadCard'
import { getAllUserLikedThreads } from '@/lib/actions/threadActions'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function LikesClient() {
    const { data: session } = useSession()

    const [likedPosts, setLikedPosts] = useState([])

    useEffect(() => {
        async function fetchAllUserLikedThreads() {
            var userLikedPosts = await getAllUserLikedThreads(session?.sessionToken)
            setLikedPosts(userLikedPosts["liked_posts"])
        }

        fetchAllUserLikedThreads()
    }, [])

    return (
        <main className='flex flex-col bg-dark-3 rounded-t-3xl mb-9'>
            {likedPosts.map((post, index) => <ThreadCard key={post?.id} postID={post?.id} username={post?.user?.username} userImage={post?.user?.image} content={post?.content} likesCount={post?.likes_count} commentsCount={post?.comments_count} retweetsCount={post?.retweets_count} likedByUser={true} createdAt={post?.created_at} isOnTop={index === 0} />)}
        </main>
    )
}

export default LikesClient