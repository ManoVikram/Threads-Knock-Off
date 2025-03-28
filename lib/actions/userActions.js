"use server"

export async function getUserDetails(userId) {
    const resposne = await fetch(`http:localhost:8080/api/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await resposne.json()

    return data
}

export async function updateUsername(userId, username) {
    
}
