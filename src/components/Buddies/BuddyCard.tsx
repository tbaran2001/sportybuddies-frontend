import {Box, Button, Card, CardContent, CardMedia, Stack, Typography, styled} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import type {Buddy} from "../../models/profile";
import {calculateAge} from "../../utils/profileUtils";

const StyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const StyledCardMedia = styled(CardMedia)(() => ({
    height: 200,
    backgroundSize: 'cover',
}));

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
}));

const BuddyName = styled(Typography)(() => ({
    fontWeight: 600,
}));

const NoPhotoPlaceholder = styled(Box)(({theme}) => ({
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[500],
}));

const ActionButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(1),
}));

interface BuddyCardProps {
    buddy: Buddy;
    isLoading: boolean;
    onMessage: (buddy: Buddy) => void;
}

export const BuddyCard = ({buddy, isLoading, onMessage}: BuddyCardProps) => {
    const profile = buddy.matchedProfile;
    const age = calculateAge(profile.dateOfBirth);

    return (
        <StyledCard>
            {profile.mainPhotoUrl ? (
                <StyledCardMedia image={profile.mainPhotoUrl} title={profile.name}/>
            ) : (
                <NoPhotoPlaceholder>
                    <PersonIcon sx={{fontSize: 64}}/>
                </NoPhotoPlaceholder>
            )}

            <StyledCardContent>
                <Stack spacing={1}>
                    <Box display="flex" alignItems="baseline" gap={1}>
                        <BuddyName variant="h6">{profile.name}</BuddyName>
                        <Typography variant="subtitle1" color="text.secondary">{age}</Typography>
                    </Box>

                    {profile.description && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {profile.description}
                        </Typography>
                    )}

                    {profile.sports.length > 0 && (
                        <Typography variant="body2">
                            <strong>Sports:</strong> {profile.sports.map(sport => sport.name).join(', ')}
                        </Typography>
                    )}

                    <ActionButton
                        variant="contained"
                        startIcon={<ChatIcon/>}
                        onClick={() => onMessage(buddy)}
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? 'Loading...' : (buddy.conversationId ? 'Continue Chat' : 'Start Chat')}
                    </ActionButton>
                </Stack>
            </StyledCardContent>
        </StyledCard>
    );
};

export default BuddyCard;

