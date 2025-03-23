"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { logIn } from '@/lib/actions/authActions'

function LeftSidebarItem({ icon, navigateToPath, isProtected = true, isUserLoggedIn = false }) {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    function handleOnClick() {
        if (isProtected) {
            if (isUserLoggedIn) {
                router.push(navigateToPath)
            } else {
                setOpen(true)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg cursor-pointer">
                    <Image src={icon} alt='left sidebar icon' width={28} height={28} />
                </div>
            </DialogTrigger>

            {isProtected && (
                <DialogContent className="sm:max-w-[520px] px-12 py-16 flex flex-col justify-center items-center bg-dark-4 border-none rounded-3xl [&>button]:hidden">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className="text-heading1-bold text-white text-center" onClick={handleOnClick}>
                                Say more with Threads
                            </div>
                        </DialogTitle>

                        <DialogDescription className="text-center">
                            Join Threads to share thoughts, find out what's going on, follow your people and more.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button className="mt-8 p-5 h-full gap-14 bg-dark-4 border-3 border-dark-3 outline-none rounded-2xl cursor-pointer" onClick={logIn}>
                            <Image src="/google-logo.svg" alt='google logo' width={48} height={48} />

                            <p className='text-base1-semibold'>Continue with Google</p>

                            <Image src="/right-arrow.svg" alt='right arrow icon' width={16} height={16} />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default LeftSidebarItem