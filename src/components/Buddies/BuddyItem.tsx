import {Button, ListItem, ListItemAvatar, ListItemText, styled, Typography, useTheme} from "@mui/material";
import type {Buddy} from "../../models/profile.ts";
import {useNavigate} from "react-router-dom";
import {useCreateConversationMutation} from "../../store/api.ts";

const StyledButton = styled(Button)(({theme}) => ({
    borderRadius: theme.spacing(3),
    textTransform: "none",
    padding: theme.spacing(1, 3),
}));


const StyledListItem = styled(ListItem)(({theme}) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: "background-color 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
}));

interface BuddyItemProps {
    buddy: Buddy;
}

export const BuddyItem = ({buddy}: BuddyItemProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [createConversation,{data:newConversation}] = useCreateConversationMutation();

    const handleButtonClick = async () => {
        let conversationId = buddy.conversationId;

        if (!conversationId) {
            createConversation({profileId: buddy.profileId, participantId: buddy.matchedProfile.id});
            if (!newConversation) {
                console.error("Failed to create conversation");
                window.location.reload();
                return;
            }
            conversationId = newConversation.id;
        }

        if (!conversationId) {
            console.error("Invalid conversation ID");
            navigate("/");
        }

        navigate(`/chat/${conversationId}`);
    };

    return (
        <StyledListItem>
            <ListItemAvatar
                role="listitem"
                aria-label={`Buddy ${buddy.matchedProfile.name}`}
                sx={{
                    borderRadius: theme.spacing(1),
                    transition: "background-color 0.2s ease",
                    "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.04)"},
                }}
            >
                <img
                    src={buddy.matchedProfile.mainPhotoUrl || "/default-avatar.png"}
                    alt={buddy.matchedProfile.name}
                    style={{width: 60, height: 60, borderRadius: theme.spacing(1), objectFit: "cover"}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" sx={{fontWeight: "medium"}}>
                        {buddy.matchedProfile.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {buddy.matchedProfile.description}
                    </Typography>
                }
                sx={{ml: 2}}
            />
            <StyledButton
                variant="contained"
                color="primary"
                startIcon={<i className="fas fa-comments"/>}
                onClick={handleButtonClick}
                aria-label={`Start or go to conversation with ${buddy.matchedProfile.name}`}
            >
                Chat
            </StyledButton>
        </StyledListItem>
    );
};
