import ThreadCard from '@/components/cards/ThreadCard'
import { getThread } from '@/lib/actions/threadActions'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

async function ThreadPage({ params }) {
    const { id } = await params

    const session = await auth()

    const thread = await getThread(id, session?.sessionToken)

    return (
        <SessionProvider session={session}>
            <div className="flex flex-col bg-dark-3 rounded-t-3xl">
                <ThreadCard postID={thread?.id} username={thread?.user?.username} userImage={thread?.user?.image} content={thread?.content} likesCount={thread?.likes_count} commentsCount={thread?.comments_count} retweetsCount={thread?.retweets_count} likedByUser={thread?.liked_by_user} createdAt={thread?.created_at} isOnTop />
            </div>
        </SessionProvider>
    )
}

export default ThreadPage