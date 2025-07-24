import {useLoaderData} from "react-router-dom";
import type {Profile} from "../models/profile.ts";

const MyProfilePage = () => {
    const profile = useLoaderData() as Profile;

    return (
        <div>
            <h1>My Profile</h1>
            <p>I am {profile.name} with id: {profile.id}</p>
        </div>
    );
}

export default MyProfilePage;