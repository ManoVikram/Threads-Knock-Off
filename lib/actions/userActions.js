"use server"

import { createClient } from "@/utils/supabase/server";

export async function updateUsername(userId, username) {
    const supabase = await createClient()

    const { error } = await supabase.schema("threads_clone").from("users").update({ username }).eq("id", userId);

    return !error;
}
