"use server"

import { createClient } from "@/utils/supabase/server";

export async function updateUsername(userId, username) {
    const supabase = await createClient()

    const { error } = await supabase.schema("next_auth").from("users").update({ username }).eq("id", userId);

    return !error;
}
