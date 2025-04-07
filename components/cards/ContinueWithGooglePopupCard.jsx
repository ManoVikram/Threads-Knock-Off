import React from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { logIn } from '@/lib/actions/authActions'

function ContinueWithGooglePopupCard({ handleOnClick = () => { } }) {
    return (
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
                <Button className="mt-8 p-5 h-full gap-14 bg-dark-4 border-3 border-dark-3 outline-none focus-visible:ring-0 rounded-2xl cursor-pointer" onClick={logIn}>
                    <Image src="/google-logo.svg" alt='google logo' width={48} height={48} />

                    <p className='text-base1-semibold'>Continue with Google</p>

                    <Image src="/right-arrow.svg" alt='right arrow icon' width={16} height={16} />
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default ContinueWithGooglePopupCard