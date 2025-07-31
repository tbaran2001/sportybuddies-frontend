import ProfilesList from "../components/ProfilesList.tsx";
import {useGetProfilesQuery} from "../store/api.ts";

const ProfilesPage = () => {
    const {data: profiles, isLoading, isError} = useGetProfilesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profiles) {
        return <div>Error</div>;
    }

    return (
        <div>
            <h1>Profiles page</h1>
            <ProfilesList profiles={profiles}/>
        </div>
    );
};

export default ProfilesPage;