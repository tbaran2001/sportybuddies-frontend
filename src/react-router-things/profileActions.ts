import {type ActionFunctionArgs, redirect} from "react-router-dom";

export async function editProfileAction({request}: ActionFunctionArgs) {
    const data = await request.formData();

    const profileData = {
        name: data.get('name') as string,
        description: data.get('description') as string,
        gender: Number(data.get('gender') as string),
        dateOfBirth: data.get('dateOfBirth') as string,
    }

    const profileId = data.get('profileId') as string;

    const response = await fetch(`https://localhost:7280/api/profiles/${profileId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })
    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to update profile'}),
            {
                status: response.status,
            }
        );
    }

    return redirect('/profiles/' + profileId);
}

export async function deleteProfileAction({params}: ActionFunctionArgs) {
    const response = await fetch(`https://localhost:7280/api/profiles/${params.profileId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to delete profile'}),
            {
                status: response.status,
            }
        );
    }

    return redirect('/profiles');
}