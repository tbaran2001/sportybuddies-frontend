import {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';
import PageContent from '../components/PageContent';
import ConversationList from '../components/Chat/ConversationList';
import MessageThread from '../components/Chat/MessageThread';
import MessageInput from '../components/Chat/MessageInput';
import {
    useGetMyProfileQuery,
    useGetConversationQuery,
    useGetConversationMessagesQuery,
    useSendMessageMutation,
    useGetProfileConversationsQuery,
    useGetLatestProfileConversationQuery
} from '../store/api';

const ChatContainer = styled(Box)(({theme}) => ({
    height: 'calc(100vh - 180px)',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
        height: 'calc(100vh - 140px)',
    }
}));

const MessagesContainer = styled(Paper)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.default
}));

const NoConversationSelected = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: 'center'
}));

export const ChatPage = () => {
    const {conversationId} = useParams<{ conversationId: string }>();
    const navigate = useNavigate();
    const location = useLocation() as ReturnType<typeof useLocation> & { state?: { suppressAutoSelect?: boolean } };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showConversationList, setShowConversationList] = useState(!conversationId || !isMobile);

    const {
        data: myProfile,
        isLoading: profileLoading
    } = useGetMyProfileQuery();
    const {
        data: conversations,
        isLoading: conversationsLoading,
        error: conversationsError
    } = useGetProfileConversationsQuery(myProfile?.id || '', {skip: !myProfile?.id});
    const {
        data: currentConversation,
        isLoading: conversationLoading,
        error: conversationError
    } = useGetConversationQuery(conversationId || '', {
        skip: !conversationId
    });
    const {
        data: messages,
        isLoading: messagesLoading,
        error: messagesError
    } = useGetConversationMessagesQuery(conversationId || '', {
        skip: !conversationId,
        pollingInterval: 3000 // Poll for new messages every 3 seconds
    });

    const {
        data: latestConversation,
        isLoading: latestLoading
    } = useGetLatestProfileConversationQuery(myProfile?.id || '', {
        skip: !myProfile?.id || !!conversationId || !!location.state?.suppressAutoSelect
    });

    const [sendMessage, {isLoading: isSendingMessage}] = useSendMessageMutation();

    const handleSelectConversation = (selectedConversationId: string) => {
        navigate(`/chat/${selectedConversationId}`);
        if (isMobile) {
            setShowConversationList(false);
        }
    };

    const handleBackToList = () => {
        setShowConversationList(true);
        if (isMobile) navigate('/chat', {state: {suppressAutoSelect: true}, replace: true});
    };

    const handleSendMessage = async (content: string) => {
        if (!myProfile || !conversationId || !content.trim()) return;

        try {
            await sendMessage({
                conversationId,
                profileId: myProfile.id,
                content: content.trim()
            }).unwrap();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    useEffect(() => {
        if (!myProfile?.id) return;
        if (conversationId) return;
        if (location.state?.suppressAutoSelect) return;

        if (!latestLoading && latestConversation) {
            navigate(`/chat/${latestConversation.id}`, {replace: true});
            return;
        }

        if (!latestLoading && !latestConversation && !conversationsLoading) {
            const list = conversations || [];
            if (list.length === 0) return;
            const sorted = [...list].sort((a, b) => {
                const aMy = a.participants.find(p => p.profile.id === myProfile.id);
                const bMy = b.participants.find(p => p.profile.id === myProfile.id);
                const aTime = aMy ? Date.parse(aMy.createdOn) : 0;
                const bTime = bMy ? Date.parse(bMy.createdOn) : 0;
                return bTime - aTime;
            });
            const targetId = sorted[0]?.id;
            if (targetId) navigate(`/chat/${targetId}`, {replace: true});
        }
    }, [myProfile?.id, conversationId, location.state, latestConversation, latestLoading, conversations, conversationsLoading, navigate]);

    useEffect(() => {
        if (isMobile) {
            setShowConversationList(!conversationId);
        } else {
            setShowConversationList(true);
        }
    }, [isMobile, conversationId]);

    if (profileLoading) {
        return (
            <PageContent title="Chat">
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress/>
                </Box>
            </PageContent>
        );
    }

    if (conversationsError) {
        return (
            <PageContent title="Chat">
                <Alert severity="error" sx={{mt: 2}}>
                    Failed to load conversations. Please try again later.
                </Alert>
            </PageContent>
        );
    }

    return (
        <PageContent title="Chat">
            <ChatContainer>
                <Grid container spacing={2} sx={{height: '100%'}}>
                    {(!isMobile || showConversationList) && (
                        <Grid size={{xs: 12, md: 4}} sx={{
                            height: '100%'
                        }}>
                            <ConversationList
                                conversations={conversations || []}
                                selectedConversationId={conversationId}
                                onSelectConversation={handleSelectConversation}
                                isLoading={conversationsLoading}
                                currentUserId={myProfile?.id || ''}
                            />
                        </Grid>
                    )}

                    {(!isMobile || !showConversationList) && (
                        <Grid size={{xs: 12, md: 8}} sx={{
                            height: '100%'
                        }}>
                            {conversationId ? (
                                <MessagesContainer>
                                    <MessageThread
                                        conversation={currentConversation}
                                        messages={messages || []}
                                        currentUserId={myProfile?.id || ''}
                                        isLoading={conversationLoading || messagesLoading}
                                        error={conversationError || messagesError}
                                        onBackClick={isMobile ? handleBackToList : undefined}
                                    />

                                    <MessageInput
                                        onSendMessage={handleSendMessage}
                                        isLoading={isSendingMessage}
                                        disabled={!!conversationError || !!messagesError}
                                    />
                                </MessagesContainer>
                            ) : (
                                <NoConversationSelected>
                                    <Typography variant="h6" gutterBottom>
                                        {conversationsLoading || latestLoading ? 'Loading conversations...' : (conversations?.length ? 'Select a conversation' : 'No conversations yet')}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {conversationsLoading || latestLoading
                                            ? 'Please wait'
                                            : (conversations?.length ? 'Choose a conversation from the list to start chatting' : 'Start matching to create your first conversation.')}
                                    </Typography>
                                </NoConversationSelected>
                            )}
                        </Grid>
                    )}
                </Grid>
            </ChatContainer>
        </PageContent>
    );
};