import {Card} from "@mui/material";
import {ProfileCardHeader} from "../ProfileCard/ProfileCardHeader.tsx";
import {ProfileCardMedia} from "../ProfileCard/ProfileCardMedia.tsx";
import {ProfileCardContent} from "../ProfileCard/ProfileCardContent.tsx";
import {ProfileCardCollapse} from "../ProfileCard/ProfileCardCollapse.tsx";
import type {Profile} from "../../models/profile.ts";

interface MatchProfileCardProps {
    profile: Profile;
}

export const MatchProfileCard = ({profile}: MatchProfileCardProps) => {
    return (
        <Card sx={{ maxWidth: 400, width: '100%' }}>
            <ProfileCardHeader profile={profile} />
            <ProfileCardMedia />
            <ProfileCardContent profile={profile} />
            <ProfileCardCollapse profile={profile} readOnly={true} />
        </Card>
    );
};
