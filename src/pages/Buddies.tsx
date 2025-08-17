import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import PageContent from '../components/PageContent';
import {useGetMyProfileQuery, useGetProfileBuddiesQuery, useCreateConversationMutation} from '../store/api';
import type {Buddy} from '../models/profile.ts';
import BuddyCard from '../components/Buddies/BuddyCard';
import EmptyBuddiesState from '../components/Buddies/EmptyBuddiesState';

export const BuddiesPage = () => {
    const navigate = useNavigate();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const {
        data: myProfile,
        isLoading: profileLoading,
        error: profileError
    } = useGetMyProfileQuery();
    const {
        data: buddies,
        isLoading: buddiesLoading,
        error: buddiesError
    } = useGetProfileBuddiesQuery(myProfile?.id || '', {skip: !myProfile?.id});

    const [createConversation, {isLoading: isCreatingConversation}] = useCreateConversationMutation();

    const handleMessageClick = async (buddy: Buddy) => {
        try {
            if (buddy.conversationId) {
                navigate(`/chat/${buddy.conversationId}`);
                return;
            }

            setLoadingStates(prev => ({...prev, [buddy.id]: true}));

            const result = await createConversation({
                profileId: myProfile!.id,
                participantId: buddy.matchedProfile.id
            }).unwrap();

            navigate(`/chat/${result.id}`);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        } finally {
            setLoadingStates(prev => ({...prev, [buddy.id]: false}));
        }
    };

    if (profileLoading || buddiesLoading) {
        return (
            <PageContent title="My Buddies">
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress/>
                </Box>
            </PageContent>
        );
    }

    if (profileError || buddiesError) {
        return (
            <PageContent title="My Buddies">
                <Alert severity="error" sx={{mt: 2}}>
                    Failed to load buddies. Please try again later.
                </Alert>
            </PageContent>
        );
    }

    if (!buddies || buddies.length === 0) {
        return (
            <PageContent title="My Buddies">
                <EmptyBuddiesState onFindMatches={() => navigate('/matching')}/>
            </PageContent>
        );
    }

    return (
        <PageContent title="My Buddies">
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{ mb: 2 }}>
                    These are people you've matched with. Start a conversation to get to know them better!
                </Typography>

                <Grid container spacing={3}>
                    {buddies.map((buddy) => {
                        const isLoading = loadingStates[buddy.id] || isCreatingConversation;

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={buddy.id}>
                                <BuddyCard
                                    buddy={buddy}
                                    isLoading={isLoading}
                                    onMessage={handleMessageClick}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </PageContent>
    );
};