"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/sonner"; // Toast for feedback
// import { updateUsername } from "@/lib/actions"; // Function to update username in DB

function EditProfileDialogPopup() {
    const { data: session, update } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isNewUser = !session?.user?.username; // Check if user has no username
    const isFromProfilePage = pathname === '/edit-profile' && !isNewUser; // Check if user is coming from profile page

    // Schema for form validation
    const FormSchema = z.object({
        username: z.string()
            .min(3, { message: "Username must be at least 3 characters." })
            .max(15, { message: "Username cannot exceed 15 characters." })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "Only letters, numbers, and underscores are allowed." })
    });

    // React Hook Form setup
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { username: session?.user?.username || "" },
    });

    // Open dialog on mount
    useEffect(() => {
        setOpen(true);
    }, []);

    // Handle closing behavior
    function handleOpenChange(isOpen) {
        if (!isOpen && isNewUser) return; // Prevent closing if first-time user hasn't set a username
        if (!isOpen) {
            router.push(isFromProfilePage ? '/profile' : '/');
        }
        setOpen(isOpen);
    }

    // Handle form submission
    async function onSubmit(data) {
        // try {
        //     // Update username in Supabase
        //     const success = await updateUsername(session.user.id, data.username);
        //     if (success) {
        //         await update({ username: data.username }); // Update session
        //         toast({ title: "Success", description: "Username updated successfully!" });
        //         setOpen(false);
        //         router.push(isFromProfilePage ? '/profile' : '/');
        //     } else {
        //         toast({ title: "Error", description: "Failed to update username. Try again." });
        //     }
        // } catch (error) {
        //     toast({ title: "Error", description: "Something went wrong!" });
        // }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[520px] px-12 py-16 flex flex-col justify-center items-center bg-dark-4 border-none rounded-3xl [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className="text-heading1-bold text-white text-center">
                            {isNewUser ? "Create Username" : "Edit Profile"}
                        </div>
                    </DialogTitle>

                    <DialogDescription className="text-center">
                        {isNewUser ? "Choose a unique username to continue." : "Update your profile details."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-5 flex flex-col justify-center items-center">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Username</FormLabel> */}

                                <FormControl>
                                    <Input placeholder="Username" {...field} className="w-full text-white px-5 py-6 selection:bg-blue-400 selection:text-black" />
                                </FormControl>

                                {/* <FormDescription>
                                    {isNewUser ? "This will be your unique username." : "You can update your username."}
                                </FormDescription> */}

                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button type="submit" className="p-6 hover:bg-dark-4 border-3 border-dark-3 outline-none rounded-2xl cursor-pointer">
                            {isNewUser ? "Continue" : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfileDialogPopup;
