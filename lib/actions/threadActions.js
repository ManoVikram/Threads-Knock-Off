"use server"

export async function postThread(content, sessionToken) {
    try {
        const response = await fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            },
            body: JSON.stringify({ content })
        })

        return response.ok
    } catch (error) {
        console.error("Error posting thread:", error.message);
        return false;
    }
}