"use server"

export async function postThread(content, sessionToken) {
    try {
        console.log(JSON.stringify({ content }));
        const response = await fetch("http://localhost:8080/api/posts", {
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

export async function getAllThreads() {
    try {
        const response = await fetch("http://localhost:8080/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.error("Error getting all thread:", error.message);
        return false;
    }
}