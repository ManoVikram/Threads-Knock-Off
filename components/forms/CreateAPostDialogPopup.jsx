"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { postThread } from '@/lib/actions/threadActions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import useThreadStore from '@/lib/store/threadStore';

function CreateAPostDialogPopup({ parentThread = null, isAComment = false }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [postContent, setPostContent] = useState("");

    // Schema for form validation
    const FormSchema = z.object({
        post: z.string().max(280, { message: "Post cannot exceed 280 characters." })
    });

    // React Hook Form setup
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    // Open dialog on mount
    useEffect(() => {
        setOpen(true);
    }, []);

    function handleOpenChange(isOpen) {
        if (!isOpen) {
            router.back()
        }
        setOpen(isOpen);
    }

    // Handle textarea changes
    function handleTextareaChange(e) {
        setPostContent(e.target.value);
    }

    // Handle form submission
    async function onSubmit(data) {
        setIsPosting(true);

        try {
            const success = await postThread(data.post, session.sessionToken)

            if (success) {
                toast.success("Success", { description: "Thread created successfully!" });

                useThreadStore.getState().addThread({ content: data.post });

                router.back();
            } else {
                toast.error("Error", { description: "Failed to create a thread. Try again." });
            }
        } catch (error) {
            toast.error("Error", { description: "Something went wrong!" });
        }

        setIsPosting(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[520px] px-6 py-6 flex flex-col justify-start items-start bg-black/50 border-none rounded-3xl [&>button]:hidden backdrop-blur-md">
                <DialogHeader className="flex flex-row w-full justify-end">
                    <Button size="icon" className="h-9 w-9 rounded-full bg-transparent hover:bg-dark-6 focus-visible:ring-0 cursor-pointer" onClick={() => handleOpenChange(false)}>
                        <Image src="/close.svg" alt='close icon' width={24} height={24} />
                    </Button>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col justify-center items-stretch">
                        {isAComment && (
                            <div className="flex gap-6.5 w-full">
                                <div className="flex flex-col justify-start items-center gap-4">
                                    <Image src={parentThread?.user?.image} alt='user profile image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

                                    <span className='w-0.5 h-full bg-dark-6' />
                                </div>

                                <p className='whitespace-pre-line text-white'>
                                    {parentThread?.content}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 w-full">
                            <Image src={session.user.image} alt='user profile image' height={36} width={36} className='h-9 w-9 rounded-full object-fill' />

                            <FormField control={form.control} name="post" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea placeholder={isAComment ? "Post your reply" : "What's happenning?"} {...field} value={postContent} onChange={(event) => {
                                            field.onChange(event)
                                            handleTextareaChange(event)
                                        }} className={`w-full min-h-36 max-h-60 h-[${Math.max(48, postContent.split('\n').length * 24)}px] text-white border-none outline-none ring-0 focus-visible:ring-0 focus-visible:border-none selection:bg-blue-400 selection:text-black`} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <p className="text-xs text-right text-dark-5">
                            {postContent.length}/280
                        </p>

                        <Button type="submit" className="p-6 hover:bg-dark-4 border-3 border-dark-3 outline-none rounded-2xl cursor-pointer" disabled={isPosting}>
                            {isPosting && <Loader2 className="animate-spin" />}

                            <p>{isAComment ? "Reply" : "Post"}</p>
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAPostDialogPopup