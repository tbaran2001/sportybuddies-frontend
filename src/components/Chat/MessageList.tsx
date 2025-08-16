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
})<MessageContainerProps>(({ sent }) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    alignItems: "flex-end",
    marginBottom: "8px",
    padding: "0 8px",
}));

const Message = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'sent',
})<MessageProps>(({sent }) => ({
    padding: "8px 12px",
    maxWidth: "65%",
    backgroundColor: sent ? "#0084ff" : "#f0f0f0",
    color: sent ? "#ffffff" : "#000000",
    borderRadius: sent 
        ? "18px 18px 4px 18px" 
        : "18px 18px 18px 4px",
    boxShadow: "none",
    wordBreak: "break-word",
    position: "relative",
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
    fontSize: "11px",
    marginTop: "4px",
    marginLeft: "4px",
    marginRight: "4px",
    color: theme.palette.text.secondary,
}));

const Avatar = styled(Box)(() => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    marginRight: "8px",
    overflow: "hidden",
}));

interface MessageListProps {
    messages: Message[];
    myProfileId: string;
    endRef: RefObject<HTMLDivElement | null>;
    participantPhotoUrl?: string;
}

export const MessageList = ({ 
    messages, 
    myProfileId, 
    endRef, 
    participantPhotoUrl 
}: MessageListProps) => {
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "h:mm a");
        } catch (error) {
            console.error(error);
            return dateString;
        }
    };

    // Group messages by sender and time proximity
    const groupedMessages = messages.reduce((acc: Message[][], message, index) => {
        const prevMessage = index > 0 ? messages[index - 1] : null;
        
        // Start a new group if:
        // 1. This is the first message
        // 2. The sender changed
        // 3. Time gap is more than 5 minutes
        const shouldStartNewGroup = 
            !prevMessage || 
            prevMessage.senderId !== message.senderId ||
            (new Date(message.createdOn).getTime() - new Date(prevMessage.createdOn).getTime() > 5 * 60 * 1000);
        
        if (shouldStartNewGroup) {
            acc.push([message]);
        } else {
            acc[acc.length - 1].push(message);
        }
        
        return acc;
    }, []);

    return (
        <Box 
            sx={{ 
                flex: 1, 
                overflow: "auto", 
                p: 2,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column"
            }}
        >
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
                groupedMessages.map((group, groupIndex) => {
                    const isSent = group[0].senderId === myProfileId;
                    
                    return (
                        <Box key={`group-${groupIndex}`} sx={{ mb: 2 }}>
                            {group.map((msg, msgIndex) => (
                                <MessageContainer key={msg.id} sent={isSent}>
                                    {!isSent && msgIndex === 0 && (
                                        <Avatar>
                                            <img 
                                                src={participantPhotoUrl || "/default-avatar.png"} 
                                                alt="Avatar"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </Avatar>
                                    )}
                                    
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: isSent ? "flex-end" : "flex-start" }}>
                                        <Message sent={isSent}>
                                            <Typography>{msg.content}</Typography>
                                        </Message>
                                        
                                        {msgIndex === group.length - 1 && (
                                            <TimeStamp variant="caption">
                                                {formatDate(msg.createdOn)}
                                            </TimeStamp>
                                        )}
                                    </Box>
                                </MessageContainer>
                            ))}
                        </Box>
                    );
                })
            )}
            <div ref={endRef}/>
        </Box>
    );
};