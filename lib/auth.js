import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getUserDetails } from "./actions/userActions"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return {
    providers: [Google],
    adapter: NeonAdapter(pool),
    callbacks: {
      async session({ session, user }) {
        const userDetails = await getUserDetails(user.id)

        // Attach `username` to session data
        session.user.username = userDetails?.username;

        return session;
      }
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  }
})