import {Box, Paper, styled, CircularProgress} from "@mui/material";
import {ChatHeader} from "../components/Chat/ChatHeader.tsx";
import {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
    useGetConversationMessagesQuery,
    useGetConversationQuery,
    useGetMyProfileQuery,
    useSendMessageMutation
} from "../store/api.ts";
import {MessageList} from "../components/Chat/MessageList.tsx";
import {InputBox} from "../components/Chat/InputBox.tsx";

const StyledPaper = styled(Paper)(() => ({
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    borderRadius: 0,
    boxShadow: "none",
}));

export const ChatPage = () => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const {conversationId} = useParams();
    const navigate = useNavigate();

    const {
        data: myProfile,
        isLoading: isProfileLoading,
    } = useGetMyProfileQuery();
    const {
        data: conversation,
        isLoading: isConversationLoading,
    } = useGetConversationQuery(conversationId || "", {skip: !conversationId});
    const {
        data: messages,
        isLoading: isMessagesLoading,
    } = useGetConversationMessagesQuery(conversationId || "", {skip: !conversationId});
    const [sendMessage] = useSendMessageMutation();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!conversationId) {
            navigate("/buddies");
        }
    }, [conversationId, navigate]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleSendMessage = () => {
        if (!message.trim() || !conversationId || !myProfile) return;
        sendMessage({
            conversationId,
            profileId: myProfile.id,
            content: message,
        });
        setMessage("");
    };

    const inputDisabled = isConversationLoading || isMessagesLoading;

    const otherParticipant = conversation?.participants.find(
        (participant) => participant.profile.id !== myProfile?.id
    )?.profile;

    const otherParticipantName = otherParticipant?.name || "Unknown";
    const otherParticipantPhotoUrl = otherParticipant?.mainPhotoUrl || null;

    return (
        <Box 
            sx={{ 
                width: "100%", 
                height: "100vh", 
                display: "flex", 
                justifyContent: "center",
                backgroundColor: "#f0f2f5"
            }}
        >
            <Box 
                sx={{ 
                    width: "100%", 
                    maxWidth: { xs: "100%", sm: "100%", md: "768px" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}
            >
                <StyledPaper>
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                        <ChatHeader 
                            participantName={otherParticipantName} 
                            participantPhotoUrl={otherParticipantPhotoUrl || undefined}
                        />
                        
                        {isProfileLoading || isConversationLoading || isMessagesLoading ? (
                            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <MessageList
                                messages={messages || []}
                                myProfileId={myProfile?.id || ""}
                                endRef={messagesEndRef}
                                participantPhotoUrl={otherParticipantPhotoUrl || undefined}
                            />
                        )}
                        
                        <InputBox
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                            disabled={inputDisabled}
                        />
                    </Box>
                </StyledPaper>
            </Box>
        </Box>
    );
};