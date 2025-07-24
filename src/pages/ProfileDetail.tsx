import {useRouteLoaderData} from "react-router-dom";
import ProfileItem from "../components/ProfileItem.tsx";
import type {Profile} from "../models/profile.ts";

const ProfileDetailPage = () => {
    const profile = useRouteLoaderData('profile-detail') as Profile;

    return (
        <div>
            <h1>Profile Detail Page</h1>
            <ProfileItem profile={profile}/>
        </div>
    );
}

export default ProfileDetailPage;