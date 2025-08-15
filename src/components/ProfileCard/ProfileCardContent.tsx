import {Box, CardContent, Tooltip} from "@mui/material";
import {sportsIcons} from "../../utils/sportsIcons";
import type {Profile} from "../../models/profile.ts";

interface ProfileCardContentProps {
    profile: Profile;
}

export const ProfileCardContent = ({profile}: ProfileCardContentProps) => {

    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                {profile.sports.map(({id, name}) => (
                    <Tooltip key={id} title={name} arrow>
                        <Box component={sportsIcons[name] || sportsIcons['default']}/>
                    </Tooltip>
                ))}
            </Box>
        </CardContent>
    );
};
