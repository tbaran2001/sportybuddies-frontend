import {useState, useMemo, useCallback} from 'react';
import {
    useGetMyProfileQuery,
    useUpdateProfilePartialMutation,
    useUpdateProfileLocationMutation,
} from '../store/api/profiles.ts';
import {
    useGetSportsQuery,
    useAddProfileSportMutation,
    useRemoveProfileSportMutation,
} from '../store/api/sports.ts';
import type {Sport, Profile} from '../models/profile';
import {getRandomSportsPhotos} from '../utils/samplePhotos';
import type {NotificationState} from '../components/common/NotificationSnackbar';
import {getCurrentCoordinates} from '../utils/geolocation';
import {reverseGeocodeCity} from '../utils/reverseGeocoding';

export const useMyProfilePage = () => {
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        severity: 'info',
    });

    const {
        data: profile,
        isLoading: profileLoading,
        error: profileError,
    } = useGetMyProfileQuery();

    const {
        data: sportsData,
        isLoading: sportsLoading,
        error: sportsError,
    } = useGetSportsQuery();

    const [updateProfile, {isLoading: isUpdating}] = useUpdateProfilePartialMutation();
    const [addSport, {isLoading: isAddingSport}] = useAddProfileSportMutation();
    const [removeSport, {isLoading: isRemovingSport}] = useRemoveProfileSportMutation();
    const [updateLocation, {isLoading: isUpdatingLocation}] = useUpdateProfileLocationMutation();

    const displayPhotos = useMemo(() => getRandomSportsPhotos(3), []);

    const handleBioUpdate = useCallback(
        async (newBio: string) => {
            if (!profile) return;
            try {
                await updateProfile({profileId: profile.id, description: newBio}).unwrap();
                setNotification({open: true, message: 'Bio updated successfully!', severity: 'success'});
            } catch (error) {
                console.error('Failed to update bio:', error);
                setNotification({open: true, message: 'Failed to update bio. Please try again.', severity: 'error'});
            }
        },
        [profile, updateProfile]
    );

    const handleBasicInfoSave = useCallback(
        async (data: { name: string; gender: number; dateOfBirth: string }) => {
            if (!profile) return;
            try {
                await updateProfile({
                    profileId: profile.id,
                    name: data.name,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth,
                }).unwrap();
                setNotification({open: true, message: 'Profile updated successfully!', severity: 'success'});
            } catch (error) {
                console.error('Failed to update basic info:', error);
                setNotification({
                    open: true,
                    message: 'Failed to update profile. Please try again.',
                    severity: 'error'
                });
            }
        },
        [profile, updateProfile]
    );

    const handleSportToggle = useCallback(
        async (sport: Sport, isSelected: boolean) => {
            if (!profile) return;
            try {
                if (isSelected) {
                    await addSport({profileId: profile.id, sportId: sport.id}).unwrap();
                    setNotification({open: true, message: `Added ${sport.name} to your sports!`, severity: 'success'});
                } else {
                    await removeSport({profileId: profile.id, sportId: sport.id}).unwrap();
                    setNotification({open: true, message: `Removed ${sport.name} from your sports!`, severity: 'info'});
                }
            } catch (error) {
                console.error('Failed to update sports:', error);
                setNotification({open: true, message: 'Failed to update sports. Please try again.', severity: 'error'});
            }
        },
        [addSport, removeSport, profile]
    );

    const handleUpdateLocation = useCallback(async () => {
        if (!profile) return;
        try {
            const {latitude, longitude} = await getCurrentCoordinates({enableHighAccuracy: true, timeout: 15000});

            const city = await reverseGeocodeCity(latitude, longitude);

            await updateLocation({
                profileId: profile.id,
                latitude,
                longitude,
                address: city ?? '',
            }).unwrap();

            setNotification({open: true, message: 'Location updated successfully!', severity: 'success'});
        } catch (error) {
            console.error('Failed to update location:', error);
            const msg = (error instanceof Error) ? error.message : 'Failed to update location. Please try again.';
            setNotification({open: true, message: msg, severity: 'error'});
        }
    }, [profile, updateLocation]);

    const handleCloseNotification = useCallback(() => {
        setNotification((prev) => ({...prev, open: false}));
    }, []);

    const isLoading = profileLoading || sportsLoading;
    const saving = isUpdating || isAddingSport || isRemovingSport || isUpdatingLocation;

    return {
        profile: profile as Profile | undefined,
        sportsData,
        displayPhotos,

        isLoading,
        profileError,
        sportsError,
        saving,

        handleBioUpdate,
        handleBasicInfoSave,
        handleSportToggle,
        handleUpdateLocation,
        notification,
        handleCloseNotification,
    } as const;
};
