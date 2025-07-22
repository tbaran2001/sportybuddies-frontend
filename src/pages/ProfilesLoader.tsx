export async function profilesLoader() {
    const response = await fetch('https://localhost:7280/api/profiles');

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to fetch profiles'}),
            {
                status: response.status,
            }
        )
    } else {
        const data = await response.json();
        return data.profiles;
    }
}