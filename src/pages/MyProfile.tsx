import {useState} from 'react';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Stack,
    Snackbar,
    styled
} from '@mui/material';
import PageContent from '../components/PageContent';
import PhotoCarousel from '../components/MyProfile/PhotoCarousel';
import ProfileInfo from '../components/MyProfile/ProfileInfo';
import BioSection from '../components/MyProfile/BioSection';
import SportsList from '../components/MyProfile/SportsList';
import {
    useGetMyProfileQuery,
    useGetSportsQuery,
    useUpdateProfilePartialMutation,
    useAddProfileSportMutation,
    useRemoveProfileSportMutation
} from '../store/api';
import type {Sport} from '../models/profile.ts';
import {getRandomSportsPhotos} from '../utils/samplePhotos';
import {Preferences} from "../components/Preferences/Preferences.tsx";

const ProfileContainer = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
}));

const MyProfilePage = () => {
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info';
    }>({
        open: false,
        message: '',
        severity: 'info'
    });

    const {
        data: profile,
        isLoading: profileLoading,
        error: profileError
    } = useGetMyProfileQuery();

    const {
        data: sportsData,
        isLoading: sportsLoading,
        error: sportsError
    } = useGetSportsQuery();

    const [updateProfile, {isLoading: isUpdating}] = useUpdateProfilePartialMutation();
    const [addSport, {isLoading: isAddingSport}] = useAddProfileSportMutation();
    const [removeSport, {isLoading: isRemovingSport}] = useRemoveProfileSportMutation();

    const displayPhotos = getRandomSportsPhotos(3);

    const handleBioUpdate = async (newBio: string) => {
        if (profile) {
            try {
                await updateProfile({
                    profileId: profile.id,
                    description: newBio
                }).unwrap();

                setNotification({
                    open: true,
                    message: 'Bio updated successfully!',
                    severity: 'success'
                });
            } catch (error) {
                console.error('Failed to update bio:', error);
                setNotification({
                    open: true,
                    message: 'Failed to update bio. Please try again.',
                    severity: 'error'
                });
            }
        }
    };

    const handleSportToggle = async (sport: Sport, isSelected: boolean) => {
        if (!profile) return;

        try {
            if (isSelected) {
                await addSport({
                    profileId: profile.id,
                    sportId: sport.id
                }).unwrap();

                setNotification({
                    open: true,
                    message: `Added ${sport.name} to your sports!`,
                    severity: 'success'
                });
            } else {
                await removeSport({
                    profileId: profile.id,
                    sportId: sport.id
                }).unwrap();

                setNotification({
                    open: true,
                    message: `Removed ${sport.name} from your sports!`,
                    severity: 'info'
                });
            }
        } catch (error) {
            console.error('Failed to update sports:', error);
            setNotification({
                open: true,
                message: 'Failed to update sports. Please try again.',
                severity: 'error'
            });
        }
    };

    const handleCloseNotification = () => {
        setNotification({
            ...notification,
            open: false
        });
    };

    if (profileLoading || sportsLoading) {
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

                    {(isUpdating || isAddingSport || isRemovingSport) && (
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={2}>
                            <CircularProgress size={20}/>
                            <Typography variant="body2" color="text.secondary">
                                Saving changes...
                            </Typography>
                        </Stack>
                    )}
                </ProfileContainer>
            </Container>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{width: '100%'}}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </PageContent>
    );
};

export default MyProfilePage;