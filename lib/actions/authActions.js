"use server"

import { signIn, signOut } from "@/auth"

async function logIn() {
    await signIn("google")
}

async function logOut() {
    await signOut()
}

export {
    logIn,
    logOut
}