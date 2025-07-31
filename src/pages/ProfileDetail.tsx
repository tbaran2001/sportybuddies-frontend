import { useParams } from "react-router-dom";
import ProfileItem from "../components/ProfileItem.tsx";
import { useGetProfileQuery } from "../store/api.ts";

const ProfileDetailPage = () => {
    const { profileId } = useParams<{ profileId: string }>();
    const { data: profile, isLoading, isError, error } = useGetProfileQuery(profileId!);

    if (isLoading) {
        return <div>Loading profile details...</div>;
    }

    if (isError) {
        return <div><h3>Error loading profile.</h3><p>{JSON.stringify(error)}</p></div>;
    }

    if (!profile) {
        return <div>Profile not found.</div>
    }

    return (
        <div>
            <h1>Profile Detail Page</h1>
            <ProfileItem profile={profile}/>
        </div>
    );
}

export default ProfileDetailPage;