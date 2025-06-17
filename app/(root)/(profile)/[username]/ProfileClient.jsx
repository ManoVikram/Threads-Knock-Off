"use client"

import ThreadCard from '@/components/cards/ThreadCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserThreadsAndReplies } from '@/lib/actions/threadActions'
import { getUserDetails, toggleFollow } from '@/lib/actions/userActions'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { set } from 'zod'

function ProfileClient({ username }) {
    const { data: session } = useSession()

    const [postsAndReplies, setPostsAndReplies] = useState({
        "posts": [],
        "replies": []
    })
    const [userData, setUserData] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        async function fetchUserThreadsAndReplies() {
            var userPostsAndReplies = await getUserThreadsAndReplies(username, session?.sessionToken)
            console.log(userPostsAndReplies);

            setPostsAndReplies(userPostsAndReplies)
        }

        async function fetchUserData() {
            var userDataResponse = await getUserDetails({ username })
            console.log(userDataResponse);

            setIsFollowing(userDataResponse?.is_following)
            setUserData(userDataResponse)
        }

        fetchUserThreadsAndReplies()
        fetchUserData()
    }, [username, session])

    async function handleFollowToggle() {
        try {
            var isFollowingTheUser = await toggleFollow(username, session?.sessionToken)
            console.log("isFollowingTheUser");
            console.log(isFollowingTheUser);
            
            
            if (isFollowingTheUser) {
                setIsFollowing(true)
            } else {
                setIsFollowing(false)
            }
        } catch (error) {
            console.error("Error toggling follow:", error);
        }
    }

    return (
        <main className='flex flex-col bg-dark-3 rounded-t-3xl mb-9 text-gray-2'>
            {/* User details section */}
            <section className='mx-6 my-4 flex flex-col gap-3'>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <p className='text-[24px] text-white font-bold'>{userData?.name}</p>

                        <p className='text-gray-2'>{username}</p>
                    </div>

                    <Image src={userData?.image} alt='user-profile-picture' width={84} height={84} className='rounded-full' />
                </div>

                <p className='font-light'>{userData?.bio}</p>

                <p className='text-[14px] text-gray-500 font-light'>{userData?.follower_count} followers</p>

                <div className="flex flex-row justify-evenly gap-3">
                    <Button className={`bg-white text-dark-3 rounded-xl flex-1 ${isFollowing ? "bg-transparent text-white border-1 border-gray-1" : ""} hover:text-white hover:border-1 hover:border-gray-1 hover:cursor-pointer`} onClick={handleFollowToggle}>{isFollowing ? "Following" : "Follow"}</Button>
                    
                    <Button className='border-gray-1 border-1 text-white rounded-xl flex-1 hover:cursor-pointer'>Message</Button>
                </div>
            </section>

            {/* User posts section */}
            <section>
                <Tabs defaultValue="threads">
                    <TabsList className='w-full bg-transparent border-b border-gray-1 rounded-none p-0 h-auto'>
                        <TabsTrigger value="threads" className='flex-1 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-b-white text-gray-1 border-transparent pb-3 rounded-none'>Threads</TabsTrigger>

                        <TabsTrigger value="replies" className='flex-1 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-b-white text-gray-1 border-transparent pb-3 rounded-none'>Replies</TabsTrigger>
                    </TabsList>

                    <TabsContent value="threads">
                        {postsAndReplies?.posts?.map((post, index) => <ThreadCard key={post?.id} postID={post?.id} username={post?.user?.username} userImage={post?.user?.image} content={post?.content} likesCount={post?.likes_count} commentsCount={post?.comments_count} retweetsCount={post?.retweets_count} likedByUser={post?.liked_by_user} createdAt={post?.created_at} />)}
                    </TabsContent>

                    <TabsContent value="replies">
                        {postsAndReplies?.replies?.map((reply, index) => <ThreadCard key={reply?.id} replyID={reply?.id} username={reply?.user?.username} userImage={reply?.user?.image} content={reply?.content} likesCount={reply?.likes_count} commentsCount={reply?.comments_count} retweetsCount={reply?.retweets_count} likedByUser={reply?.liked_by_user} createdAt={reply?.created_at} />)}
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
}

export default ProfileClient