import {type ActionFunctionArgs, redirect} from "react-router-dom";

export async function getTokenAction({request}:ActionFunctionArgs){
    const data = await request.formData();
    const email = data.get('email') as string;

    const response = await fetch('https://localhost:7280/api/auth/generate-and-create-test-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Failed to authenticate'}),
            {
                status: response.status,
            }
        );
    }

    const tokenData = await response.json();
    localStorage.setItem('token', tokenData.token);

    return redirect('/');
}