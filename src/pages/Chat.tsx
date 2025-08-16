import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
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
import ConversationList from '../components/chat/ConversationList';
import MessageThread from '../components/chat/MessageThread';
import MessageInput from '../components/chat/MessageInput';
import {
    useGetMyProfileQuery,
    useGetConversationQuery,
    useGetConversationMessagesQuery,
    useSendMessageMutation,
    useGetProfileConversationsQuery
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
    boxShadow: theme.shadows[1]
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

    const [sendMessage, {isLoading: isSendingMessage}] = useSendMessageMutation();

    const handleSelectConversation = (selectedConversationId: string) => {
        navigate(`/chat/${selectedConversationId}`);
        if (isMobile) {
            setShowConversationList(false);
        }
    };

    const handleBackToList = () => {
        setShowConversationList(true);
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
        if (isMobile && conversationId) {
            setShowConversationList(false);
        } else if (!isMobile) {
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
                    {(showConversationList || !isMobile) && (
                        <Grid sx={{
                            height: '100%',
                            display: isMobile && conversationId ? 'none' : 'block'
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

                    <Grid sx={{
                        height: '100%',
                        display: isMobile && showConversationList && conversationId ? 'none' : 'block'
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
                                    Select a conversation
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Choose a conversation from the list to start chatting
                                </Typography>
                            </NoConversationSelected>
                        )}
                    </Grid>
                </Grid>
            </ChatContainer>
        </PageContent>
    );
};