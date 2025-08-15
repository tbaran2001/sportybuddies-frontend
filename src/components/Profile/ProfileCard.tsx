import {Card, Paper} from "@mui/material";
import {ProfileCardHeader} from "./ProfileCardHeader.tsx";
import {ProfileCardMedia} from "./ProfileCardMedia.tsx";
import {ProfileCardContent} from "./ProfileCardContent.tsx";
import {ProfileCardCollapse} from "./ProfileCardCollapse.tsx";

export const ProfileCard = () => {


    return (
        <Paper>
            <Card sx={{backgroundColor: 'primary.main'}}>
                <ProfileCardHeader/>
                <ProfileCardMedia/>
                <ProfileCardContent/>
                <ProfileCardCollapse/>
            </Card>
        </Paper>
    );
};
