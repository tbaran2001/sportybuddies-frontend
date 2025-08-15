import {Box, CardHeader, IconButton, Typography} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type {Profile} from "../../models/profile.ts";

interface ProfileCardHeaderProps {
    profile: Profile;
}

export const ProfileCardHeader = ({profile}: ProfileCardHeaderProps) => {

    const calculateAge = (dateOfBirth: string) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <CardHeader
            action={(
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            )}
            title={
                <Typography variant="h6">
                    {profile.name}, {calculateAge(profile.dateOfBirth)}l
                </Typography>
            }
            subheader={
                <Box>
                    <Typography variant="subtitle1">
                        {profile.location?.address && <span>{profile.location.address} </span>}
                    </Typography>
                </Box>
            }
        />
    );
};
