"use server"

export async function search(searchQuery) {
    try {
        const response = await fetch(`http://localhost:8080/api/search?q=${searchQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.error("Error during search:", error.message);
        return false;
    }
}