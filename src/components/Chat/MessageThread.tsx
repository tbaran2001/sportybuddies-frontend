import {useRef, useEffect} from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Divider,
    CircularProgress,
    Alert,
    styled
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import type {Conversation, Message} from '../../models/profile';
import {formatMessageTime} from '../../utils/dateUtils';

interface MessageThreadProps {
    conversation?: Conversation;
    messages: Message[];
    currentUserId: string;
    isLoading: boolean;
    error?: unknown;
    onBackClick?: () => void;
}

const ThreadHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`
}));

const ThreadContent = styled(Box)(({theme}) => ({
    flexGrow: 1,
    overflow: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50]
}));

// Use shouldForwardProp to prevent passing isCurrentUser to the DOM element
const MessageBubble = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isCurrentUser'
})<{ isCurrentUser: boolean }>(({theme, isCurrentUser}) => ({
    maxWidth: '70%',
    padding: theme.spacing(1, 2),
    borderRadius: 16,
    marginBottom: theme.spacing(1),
    wordBreak: 'break-word',
    backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
    color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
    boxShadow: theme.shadows[1]
}));

const MessageGroup = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16
}));

const MessageTime = styled(Typography)(({theme}) => ({
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
    marginTop: 4,
    textAlign: 'right'
}));

const MessageThread = ({
                           conversation,
                           messages,
                           currentUserId,
                           isLoading,
                           error,
                           onBackClick
                       }: MessageThreadProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const otherParticipant = conversation?.participants.find(
        participant => participant.profile.id !== currentUserId
    );

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const groupedMessages: Message[][] = [];
    let currentGroup: Message[] = [];
    let currentSender = '';

    messages.forEach((message, index) => {
        if (message.senderId !== currentSender) {
            if (currentGroup.length > 0) {
                groupedMessages.push([...currentGroup]);
                currentGroup = [];
            }
            currentSender = message.senderId;
        }

        currentGroup.push(message);

        if (index === messages.length - 1 && currentGroup.length > 0) {
            groupedMessages.push([...currentGroup]);
        }
    });

    if (isLoading) {
        return (
            <>
                <ThreadHeader>
                    {onBackClick && (
                        <IconButton edge="start" onClick={onBackClick} sx={{mr: 1}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    )}
                    <Typography variant="h6">Loading conversation...</Typography>
                </ThreadHeader>
                <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                    <CircularProgress/>
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <ThreadHeader>
                    {onBackClick && (
                        <IconButton edge="start" onClick={onBackClick} sx={{mr: 1}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    )}
                    <Typography variant="h6">Error</Typography>
                </ThreadHeader>
                <Box p={2}>
                    <Alert severity="error">
                        Failed to load conversation. Please try again later.
                    </Alert>
                </Box>
            </>
        );
    }

    if (!conversation || !otherParticipant) {
        return (
            <>
                <ThreadHeader>
                    {onBackClick && (
                        <IconButton edge="start" onClick={onBackClick} sx={{mr: 1}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    )}
                    <Typography variant="h6">Conversation not found</Typography>
                </ThreadHeader>
                <Box p={2}>
                    <Alert severity="info">
                        This conversation doesn't exist or you don't have access to it.
                    </Alert>
                </Box>
            </>
        );
    }

    return (
        <>
            <ThreadHeader>
                {onBackClick && (
                    <IconButton edge="start" onClick={onBackClick} sx={{mr: 1}}>
                        <ArrowBackIcon/>
                    </IconButton>
                )}

                {otherParticipant.profile.mainPhotoUrl ? (
                    <Avatar
                        src={otherParticipant.profile.mainPhotoUrl}
                        alt={otherParticipant.profile.name}
                        sx={{mr: 2}}
                    />
                ) : (
                    <Avatar sx={{mr: 2}}>
                        <PersonIcon/>
                    </Avatar>
                )}

                <Box>
                    <Typography variant="subtitle1">
                        {otherParticipant.profile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {otherParticipant.profile.sports.length > 0
                            ? otherParticipant.profile.sports.map(sport => sport.name).join(', ')
                            : 'No sports listed'}
                    </Typography>
                </Box>
            </ThreadHeader>

            <Divider/>

            <ThreadContent>
                {groupedMessages.length === 0 ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexGrow={1}
                        textAlign="center"
                    >
                        <Typography color="text.secondary">
                            No messages yet. Start the conversation!
                        </Typography>
                    </Box>
                ) : (
                    groupedMessages.map((group, groupIndex) => {
                        const isCurrentUser = group[0].senderId === currentUserId;

                        return (
                            <MessageGroup key={`group-${groupIndex}`}>
                                {group.map((message, messageIndex) => (
                                    <Box key={message.id} sx={{display: 'flex', flexDirection: 'column'}}>
                                        <MessageBubble isCurrentUser={isCurrentUser}>
                                            <Typography variant="body1">
                                                {message.content}
                                            </Typography>
                                        </MessageBubble>

                                        {messageIndex === group.length - 1 && (
                                            <MessageTime>
                                                {formatMessageTime(message.createdOn)}
                                            </MessageTime>
                                        )}
                                    </Box>
                                ))}
                            </MessageGroup>
                        );
                    })
                )}
                <div ref={messagesEndRef}/>
            </ThreadContent>
        </>
    );
};

export default MessageThread;