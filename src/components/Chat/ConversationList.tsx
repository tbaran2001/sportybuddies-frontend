import {useState, useMemo} from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Paper,
    InputBase,
    IconButton,
    Divider,
    CircularProgress,
    styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import type {Conversation} from '../../models/profile';
import {formatRelativeTime} from '../../utils/dateUtils';

interface ConversationListProps {
    conversations: Conversation[];
    selectedConversationId?: string;
    onSelectConversation: (conversationId: string) => void;
    isLoading: boolean;
    currentUserId: string;
}

const ConversationListContainer = styled(Paper)(({theme}) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
}));

const SearchContainer = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1)
}));

const ConversationsContainer = styled(Box)(() => ({
    flexGrow: 1,
    overflow: 'auto'
}));

const ConversationItem = styled(ListItem)<{ selected?: boolean }>(({theme, selected}) => ({
    cursor: 'pointer',
    backgroundColor: selected ? theme.palette.action.selected : 'transparent',
    '&:hover': {
        backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover
    }
}));

const TimeStamp = styled(Typography)(({theme}) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary
}));

const EmptyListMessage = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(3),
    textAlign: 'center'
}));

const ConversationList = ({
                              conversations,
                              selectedConversationId,
                              onSelectConversation,
                              isLoading,
                              currentUserId
                          }: ConversationListProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = useMemo(() => conversations.filter(conversation => {
        const otherParticipant = conversation.participants.find(
            participant => participant.profile.id !== currentUserId
        );

        if (!otherParticipant) return false;

        return otherParticipant.profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    }), [conversations, searchQuery, currentUserId]);

    const getOtherParticipant = useMemo(() => (conversation: Conversation) => {
        return conversation.participants.find(
            participant => participant.profile.id !== currentUserId
        );
    }, [currentUserId]);

    if (isLoading) {
        return (
            <ConversationListContainer>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress/>
                </Box>
            </ConversationListContainer>
        );
    }

    return (
        <ConversationListContainer>
            <SearchContainer>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
                >
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        placeholder="Search conversations"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </SearchContainer>

            <Divider/>

            <ConversationsContainer>
                {filteredConversations.length > 0 ? (
                    <List disablePadding>
                        {filteredConversations.map((conversation) => {
                            const otherParticipant = getOtherParticipant(conversation);
                            if (!otherParticipant) return null;

                            const {profile} = otherParticipant;

                            return (
                                <ConversationItem
                                    key={conversation.id}
                                    selected={conversation.id === selectedConversationId}
                                    onClick={() => onSelectConversation(conversation.id)}
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        {profile.mainPhotoUrl ? (
                                            <Avatar src={profile.mainPhotoUrl} alt={profile.name}/>
                                        ) : (
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                        )}
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Box display="flex" flexDirection="column" gap={0.25}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="subtitle1" component="span">
                                                        {profile.name}
                                                    </Typography>
                                                    <TimeStamp>
                                                        {formatRelativeTime(otherParticipant.createdOn)}
                                                    </TimeStamp>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    component="span"
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}
                                                >
                                                    {profile.description || 'No message yet. Start a conversation!'}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ConversationItem>
                            );
                        })}
                    </List>
                ) : (
                    <EmptyListMessage>
                        <Typography variant="body1" color="text.secondary">
                            {searchQuery
                                ? 'No conversations match your search'
                                : 'No conversations yet'}
                        </Typography>
                    </EmptyListMessage>
                )}
            </ConversationsContainer>
        </ConversationListContainer>
    );
};

export default ConversationList;
