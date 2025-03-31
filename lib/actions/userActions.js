"use server"

export async function getUserDetails(userId) {
    try {
        const resposne = await fetch(`http:localhost:8080/api/user/${userId}`, {
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
