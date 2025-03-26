import { createClient } from "@/utils/supabase/server";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const supabase = await createClient();

      const { data, error, status } = await supabase.schema("threads_clone").from("users").select("username").eq("id", user.id).single();

      // Attach `username` to session data
      session.user.username = data?.username;

      return session;
    }
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
})