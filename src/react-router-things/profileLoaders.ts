import {type LoaderFunctionArgs, redirect} from "react-router-dom";
import {getAuthToken} from "../utils/auth.ts";

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

export async function profileLoader({params}: LoaderFunctionArgs) {
    const response = await fetch(`https://localhost:7280/api/profiles/${params.profileId}`);
    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to fetch profiles'}),
            {
                status: response.status,
            }
        );
    } else {
        const data = await response.json();
        return data.profile;
    }
}

export async function myProfileLoader() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/auth')
    }
    const response = await fetch('https://localhost:7280/api/profiles/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to fetch profiles'}),
            {
                status: response.status,
            }
        );
    } else {
        const data = await response.json();
        return data.profile;
    }
}