import {Stack} from "@mui/material";
import {ProfileCard} from "../components/Profile/ProfileCard.tsx";
import {Preferences} from "../components/Preferences/Preferences.tsx";

const MyProfilePage = () => {
    return (
        <Stack>
            <ProfileCard/>
            <Preferences/>
        </Stack>
    );
}

export default MyProfilePage;