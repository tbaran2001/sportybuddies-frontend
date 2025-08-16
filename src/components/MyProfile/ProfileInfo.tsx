import {Box, Typography, Chip, Stack, styled} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type {Profile} from '../../models/profile.ts';
import {calculateAge} from '../../utils/profileUtils';

interface ProfileInfoProps {
    profile: Profile;
}

const ProfileInfoContainer = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
}));

const ProfileName = styled(Typography)(({theme}) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
}));

const LocationChip = styled(Chip)(({theme}) => ({
    backgroundColor: theme.palette.grey[100],
    '& .MuiChip-icon': {
        color: theme.palette.primary.main,
    },
}));

const ProfileInfo = ({profile}: ProfileInfoProps) => {
    const age = calculateAge(profile.dateOfBirth);

    return (
        <ProfileInfoContainer>
            <Stack spacing={1}>
                <Box display="flex" alignItems="baseline" gap={1}>
                    <ProfileName variant="h5">
                        {profile.name}
                    </ProfileName>
                    <Typography variant="h6" color="text.secondary">
                        {age}
                    </Typography>
                </Box>

                {profile.location && (
                    <LocationChip
                        icon={<LocationOnIcon/>}
                        label={profile.location.address}
                        size="small"
                    />
                )}
            </Stack>
        </ProfileInfoContainer>
    );
};

export default ProfileInfo;