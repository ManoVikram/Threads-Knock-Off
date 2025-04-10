"use client"

import ContinueWithGooglePopupCard from '@/components/cards/ContinueWithGooglePopupCard'
import CreateAPostDialogPopup from '@/components/forms/CreateAPostDialogPopup'
import ThreadCard from '@/components/cards/ThreadCard'
import { Dialog } from '@/components/ui/dialog'
import { getAllThreads } from '@/lib/actions/threadActions'
import useCreatePostPopupStore from '@/lib/store/createPostPopupStore'
import useLoginPopupStore from '@/lib/store/loginPopupStore'
import useThreadStore from '@/lib/store/threadStore'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function HomeClient() {
    const { data: session } = useSession()

    const { threads, setThreads } = useThreadStore();
    const { showLoginPopup, setShowLoginPopup } = useLoginPopupStore()
    const { showCreatePostPopup, parentThreadID } = useCreatePostPopupStore()

    useEffect(() => {
        async function fetchThreads() {
            const allThreadsData = await getAllThreads(session?.sessionToken);
            setThreads(allThreadsData);
        }

        fetchThreads();
    }, [setThreads]);

    return (
        <>
            <main className='flex flex-col bg-dark-3 rounded-t-3xl mb-9'>
                {threads.map((thread) => (
                    <ThreadCard key={thread?.id} postID={thread?.id} username={thread?.user?.username} userImage={thread?.user?.image} content={thread?.content} likesCount={thread?.likes_count} commentsCount={thread?.comments_count} retweetsCount={thread?.retweets_count} likedByUser={thread?.liked_by_user} />
                ))}
            </main>


            {showLoginPopup && (
                <Dialog open={showLoginPopup} onOpenChange={setShowLoginPopup}>
                    <ContinueWithGooglePopupCard />
                </Dialog>
            )}

            {showCreatePostPopup && <CreateAPostDialogPopup parentThread={threads.find(thread => thread?.id === parentThreadID)} isAComment />}
        </>
    )
}

export default HomeClient