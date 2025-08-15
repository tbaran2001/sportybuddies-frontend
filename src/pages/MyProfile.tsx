import {
    useGetMyProfileQuery,
} from "../store/api.ts";
import {Stack} from "@mui/material";
import {ProfileCard} from "../components/Profile/ProfileCard.tsx";
import {Preferences} from "../components/Preferences/Preferences.tsx";

const MyProfilePage = () => {
    const {data: myProfile, isLoading, isError} = useGetMyProfileQuery();

    if (isLoading || !myProfile) {
        return <div>Loading profile...</div>;
    }

    if (isError) {
        return <h3>Error loading profile.</h3>;
    }

    return (
        <Stack>
            <ProfileCard/>
            <Preferences/>
        </Stack>
    );
}

export default MyProfilePage;