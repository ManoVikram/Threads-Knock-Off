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

export async function getAllThreads(sessionToken = null) {
    try {
        const response = await fetch("http://localhost:8080/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.error("Error getting all thread:", error.message);
        return null;
    }
}

export async function getThread(postID, sessionToken = null) {
    try {
        const response = await fetch(`http://localhost:8080/api/post/${postID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.error("Error getting the thread:", error.message);
        return null;
    }
}

export async function handleThreadLikes(postID, sessionToken) {
    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postID}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            },
        })

        return response.ok
    } catch (error) {
        console.error("Error liking the thread:", error.message);
        return false;
    }
}

export async function postThreadComment(content, parent_id, sessionToken) {
    try {
        const response = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({ content, parent_id })
        })

        return response.ok
    } catch (error) {
        console.error("Error replying to the thread:", error.message);
        return false;
    }
}

export async function getAllUserLikedThreads(sessionToken) {
    try {
        const response = await fetch("http://localhost:8080/api/liked-posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            }
        })

        return response.json();
    } catch (error) {
        console.error("Error getting all user liked threads:", error.message);
        return null;
    }
}

export async function getUserThreadsAndReplies(username, sessionToken) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${username}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            }
        })

        return response.json()
    } catch (error) {
        console.error("Error getting the user's threads:", error.message);
        return null;
    }
}