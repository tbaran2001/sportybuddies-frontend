import {Card, Paper} from "@mui/material";
import {ProfileCardHeader} from "./ProfileCardHeader.tsx";
import {ProfileCardMedia} from "./ProfileCardMedia.tsx";
import {ProfileCardContent} from "./ProfileCardContent.tsx";
import {ProfileCardCollapse} from "./ProfileCardCollapse.tsx";
import {useGetMyProfileQuery} from "../../store/api.ts";

export const ProfileCard = () => {
    const {data: myProfile, isLoading: isLoadingProfile} = useGetMyProfileQuery();

    if (isLoadingProfile || !myProfile) {
        return <div>Loading profile...</div>;
    }

    return (
        <Paper>
            <Card sx={{backgroundColor: 'primary.main'}}>
                <ProfileCardHeader profile={myProfile}/>
                <ProfileCardMedia/>
                <ProfileCardContent profile={myProfile}/>
                <ProfileCardCollapse profile={myProfile}/>
            </Card>
        </Paper>
    );
};
