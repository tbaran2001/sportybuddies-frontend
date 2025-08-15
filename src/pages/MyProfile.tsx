import {Stack} from "@mui/material";
import {MyProfileCard} from "../components/MyProfile/MyProfileCard.tsx";
import {Preferences} from "../components/Preferences/Preferences.tsx";

const MyProfilePage = () => {
    return (
        <Stack>
            <MyProfileCard/>
            <Preferences/>
        </Stack>
    );
}

export default MyProfilePage;