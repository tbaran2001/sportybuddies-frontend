import {useState, useEffect} from 'react';
import {
    Box,
    Container,
    CircularProgress,
    Alert,
    styled,
} from '@mui/material';
import PageContent from '../components/PageContent';
import PhotoCarousel from '../components/MyProfile/PhotoCarousel';
import MatchCardContainer from '../components/Matching/MatchCardContainer';
import MatchHeader from '../components/Matching/MatchHeader';
import MatchDetails from '../components/Matching/MatchDetails';
import SwipeButtons from '../components/Matching/SwipeButtons';
import {useGetMyProfileQuery, useGetRandomMatchQuery, useUpdateMatchSwipeMutation} from '../store/api';
import {getRandomSportsPhotos} from '../utils/samplePhotos';
import {calculateAge} from '../utils/profileUtils';

const MediaArea = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
});

export const MatchingPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);

    const {data: myProfile, isLoading: profileLoading, refetch: refetchMyProfile} = useGetMyProfileQuery(undefined, { refetchOnMountOrArgChange: true });
    const {data: match, isLoading: matchLoading, refetch: refetchMatch} =
        useGetRandomMatchQuery(myProfile?.id || '', {skip: !myProfile?.id, refetchOnMountOrArgChange: true});

    const [updateSwipe, {isLoading: isUpdatingSwipe}] = useUpdateMatchSwipeMutation();

    // Force refresh on mount and when profile becomes available
    useEffect(() => {
        refetchMyProfile();
    }, [refetchMyProfile]);

    useEffect(() => {
        if (myProfile?.id) {
            refetchMatch();
        }
    }, [myProfile?.id, refetchMatch]);

    useEffect(() => {
        if (match?.matchedProfile) {
            const photos: string[] = [];
            if (match.matchedProfile.mainPhotoUrl) {
                photos.push(match.matchedProfile.mainPhotoUrl);
            }
            const randomPhotos = getRandomSportsPhotos(match.matchedProfile.mainPhotoUrl ? 2 : 3);
            setCurrentPhotos([...photos, ...randomPhotos]);
        }
    }, [match]);

    const handleSwipe = async (swipeValue: number) => {
        if (match?.id) {
            try {
                await updateSwipe({matchId: match.id, swipe: swipeValue}).unwrap();
                refetchMatch();
                setExpanded(false);
            } catch (error) {
                console.error('Failed to update swipe:', error);
            }
        }
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    if (profileLoading || matchLoading) {
        return (
            <PageContent title="Find Buddies">
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress/>
                </Box>
            </PageContent>
        );
    }

    if (!match) {
        return (
            <PageContent title="Find Buddies">
                <Container maxWidth="sm">
                    <Alert severity="info" sx={{mt: 2}}>
                        No more potential matches available right now. Check back later!
                    </Alert>
                </Container>
            </PageContent>
        );
    }

    const {matchedProfile} = match;
    const age = calculateAge(matchedProfile.dateOfBirth);

    return (
        <PageContent title="Find Buddies">
            <Container maxWidth="md">
                <MatchCardContainer>
                    <MediaArea>
                        <PhotoCarousel photos={currentPhotos}/>

                        <MatchHeader
                            name={matchedProfile.name}
                            age={age}
                            distanceMiles={Math.round(match.distance)}
                            showLocation={!!matchedProfile.location}
                            expanded={expanded}
                            onToggle={toggleExpanded}
                        />
                    </MediaArea>

                    <MatchDetails
                        expanded={expanded}
                        description={matchedProfile.description}
                        sports={matchedProfile.sports}
                    />
                </MatchCardContainer>

                <SwipeButtons
                    onDislike={() => handleSwipe(2)}
                    onLike={() => handleSwipe(1)}
                    disabled={isUpdatingSwipe}
                />

                {isUpdatingSwipe && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress size={24}/>
                    </Box>
                )}
            </Container>
        </PageContent>
    );
};