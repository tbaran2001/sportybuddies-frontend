import {Card} from "@mui/material";
import {ProfileCardHeader} from "../ProfileCard/ProfileCardHeader.tsx";
import {ProfileCardMedia} from "../ProfileCard/ProfileCardMedia.tsx";
import {ProfileCardContent} from "../ProfileCard/ProfileCardContent.tsx";
import {ProfileCardCollapse} from "../ProfileCard/ProfileCardCollapse.tsx";
import {useGetMyProfileQuery} from "../../store/api.ts";

export const MyProfileCard = () => {
    const {data: myProfile, isLoading: isLoadingProfile} = useGetMyProfileQuery();

    if (isLoadingProfile || !myProfile) {
        return <div>Loading profile...</div>;
    }

    return (
        <Card sx={{maxWidth: 400, width: '100%', margin: 'auto'}}>
            <ProfileCardHeader profile={myProfile}/>
            <ProfileCardMedia/>
            <ProfileCardContent profile={myProfile}/>
            <ProfileCardCollapse profile={myProfile}/>
        </Card>
    );
};
