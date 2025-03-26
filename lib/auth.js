import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return {
    providers: [Google],
    adapter: NeonAdapter(pool),
    callbacks: {
      async session({ session, user }) {
        // const supabase = await createClient();

        // const { data, error, status } = await supabase.schema("threads_clone").from("users").select("username").eq("id", user.id).single();
        // TODO: Probably fetch the username from the DB using API

        // Attach `username` to session data
        session.user.username = data?.username;

        return session;
      }
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  }
})