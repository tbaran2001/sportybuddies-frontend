import {Box, CardHeader, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useGetMyProfileQuery} from "../../store/api.ts";

export const ProfileCardHeader = () => {
    const {data: myProfile, isLoading} = useGetMyProfileQuery();

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

    if (isLoading || !myProfile) {
        return <CardHeader title="Loading profile..." />;
    }

    return (
        <CardHeader
            action={(
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            )}
            title={
                <Typography variant="h6">
                    {myProfile.name}, {calculateAge(myProfile.dateOfBirth)}l
                </Typography>
            }
            subheader={
                <Box>
                    <Typography variant="subtitle1">
                        {myProfile.location?.address && <span>{myProfile.location.address} </span>}
                    </Typography>
                </Box>
            }
        />
    );
};
