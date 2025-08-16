import {Box, Typography, Paper, styled} from "@mui/material";
import {format} from "date-fns";
import type {Message} from "../../models/profile.ts";
import type {RefObject} from "react";

interface MessageContainerProps {
    sent: boolean;
}

interface MessageProps {
    sent: boolean;
}

const MessageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'sent',
})<MessageContainerProps>(({theme, sent}) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
}));

const Message = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'sent',
})<MessageProps>(({theme, sent}) => ({
    padding: theme.spacing(1, 2),
    maxWidth: "70%",
    backgroundColor: sent ? theme.palette.primary.light : theme.palette.grey[200],
    color: sent ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

interface MessageListProps {
    messages: Message[];
    myProfileId: string;
    endRef: RefObject<HTMLDivElement | null>;
}

export const MessageList = ({messages, myProfileId, endRef}: MessageListProps) => {
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "d MMMM yyyy, HH:mm");
        } catch (error) {
            console.error(error);
            return dateString;
        }
    };

    return (
        <Box sx={{flex: 1, overflow: "auto", p: 2}}>
            {messages.length === 0 ? (
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary"
                }}>
                    <Typography>No messages yet. Start the conversation!</Typography>
                </Box>
            ) : (
                messages.map((msg) => (
                    <MessageContainer key={msg.id} sent={msg.senderId === myProfileId}>
                        <Message sent={msg.senderId === myProfileId}>
                            <Typography>{msg.content}</Typography>
                            <Typography
                                variant="caption"
                                sx={{display: "block", mt: 0.5, opacity: 0.7}}
                            >
                                {formatDate(msg.createdOn)}
                            </Typography>
                        </Message>
                    </MessageContainer>
                ))
            )}
            <div ref={endRef}/>
        </Box>
    );
};
