import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Stack,
    styled
} from '@mui/material';
import PageContent from '../components/PageContent';
import PhotoCarousel from '../components/MyProfile/PhotoCarousel';
import ProfileInfo from '../components/MyProfile/ProfileInfo';
import BioSection from '../components/MyProfile/BioSection';
import SportsList from '../components/MyProfile/SportsList';
import {Preferences} from "../components/Preferences/Preferences.tsx";
import {useMyProfilePage} from '../hooks/useMyProfilePage';
import {NotificationSnackbar} from '../components/common/NotificationSnackbar';

const ProfileContainer = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
}));

const MyProfilePage = () => {
    const {
        profile,
        sportsData,
        displayPhotos,
        isLoading,
        profileError,
        sportsError,
        saving,
        handleBioUpdate,
        handleSportToggle,
        notification,
        handleCloseNotification,
    } = useMyProfilePage();

    if (isLoading) {
        return (
            <PageContent title="My Profile">
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress/>
                </Box>
            </PageContent>
        );
    }

    if (profileError || sportsError) {
        return (
            <PageContent title="My Profile">
                <Alert severity="error" sx={{mt: 2}}>
                    Failed to load profile data. Please try again later.
                </Alert>
            </PageContent>
        );
    }

    if (!profile || !sportsData) {
        return (
            <PageContent title="My Profile">
                <Alert severity="info" sx={{mt: 2}}>
                    Profile data not available. Please log in again.
                </Alert>
            </PageContent>
        );
    }

    return (
        <PageContent title="My Profile">
            <Container maxWidth="md">
                <ProfileContainer>
                    <PhotoCarousel photos={displayPhotos}/>

                    <Box mt={2}>
                        <ProfileInfo profile={profile}/>
                    </Box>

                    <BioSection
                        bio={profile.description}
                        onSave={handleBioUpdate}
                        maxLength={500}
                    />

                    <SportsList
                        userSports={profile.sports}
                        allSports={sportsData}
                        onToggleSport={handleSportToggle}
                    />

                    <Preferences/>

                    {saving && (
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={2}>
                            <CircularProgress size={20}/>
                            <Typography variant="body2" color="text.secondary">
                                Saving changes...
                            </Typography>
                        </Stack>
                    )}
                </ProfileContainer>
            </Container>

            <NotificationSnackbar
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleCloseNotification}
            />
        </PageContent>
    );
};

export default MyProfilePage;