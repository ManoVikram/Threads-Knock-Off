"use server"

export async function getUserDetails({ userId, username }) {
    console.log(userId);
    console.log(username);
    console.log(`http:localhost:8080/api/user?${userId != undefined ? `userid=${userId}` : ""}${userId != undefined && username != undefined ? "&" : ""}${username != undefined ? `username=${username}` : ""}`,);

    try {
        const resposne = await fetch(`http:localhost:8080/api/user?${userId != undefined ? `userid=${userId}` : ""}${userId != undefined && username != undefined ? "&" : ""}${username != undefined ? `username=${username}` : ""}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resposne.json()

        return data
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        return null;
    }
}

export async function updateUsername(userId, username, sessionToken) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/username`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            },
            body: JSON.stringify({ username })
        });

        return response.ok; // Returns true for success, false for failure
    } catch (error) {
        console.error("Error updating username:", error.message);
        return false;
    }
}

export async function toggleFollow(username, sessionToken) {
    try {
        const response = await fetch(`http://localhost:8080/api/follow/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`
            },
            body: JSON.stringify({ username })
        });
        const data = await response.json();

        return data?.isFollowing;
    } catch (error) {
        console.error("Error toggling follow:", error.message);
        return false;
    }
}
