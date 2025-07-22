import type {LoaderFunctionArgs} from "react-router-dom";

export async function profileLoader({params}: LoaderFunctionArgs) {
    const response = await fetch(`https://localhost:7280/api/profiles/${params.profileId}`);
    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to fetch profiles'}),
            {
                status: response.status,
            }
        );
    }
    const data = await response.json();
    return data.profile;
}