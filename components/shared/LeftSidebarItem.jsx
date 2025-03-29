"use client"

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ContinueWithGooglePopupCard from '../cards/ContinueWithGooglePopupCard'

function LeftSidebarItem({ icon, navigateToPath, isProtected = true, isUserLoggedIn = false }) {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    function handleClick() {
        if (isProtected && !isUserLoggedIn) {
            setOpen(true) // Open popup instead of navigating
        } else {
            router.push(navigateToPath) // Navigate if allowed
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="hover:bg-dark-3 px-4.5 py-3 rounded-lg cursor-pointer" onClick={handleClick} >
                    <Image src={icon} alt='left sidebar icon' width={28} height={28} />
                </div>
            </DialogTrigger>

            {(isProtected && !isUserLoggedIn) && (<ContinueWithGooglePopupCard handleOnClick={handleClick} />)}
        </Dialog>
    )
}

export default LeftSidebarItem