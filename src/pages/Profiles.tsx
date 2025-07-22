import ProfilesList from "../components/ProfilesList.tsx";
import {useLoaderData} from "react-router-dom";
import type {Profile} from "../models/profile.ts";

const ProfilesPage = () => {
    const profiles = useLoaderData() as Profile[];

    return (
        <div>
            <h1>Profiles page</h1>
            <ProfilesList profiles={profiles}/>
        </div>
    )
}

export default ProfilesPage;

