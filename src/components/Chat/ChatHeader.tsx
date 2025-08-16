import {Box, Typography, IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
    participantName: string;
    participantPhotoUrl?: string;
}

export const ChatHeader = ({ participantName, participantPhotoUrl }: ChatHeaderProps) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 1.5,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
            }}
        >
            <IconButton 
                onClick={() => navigate("/buddies")} 
                sx={{ mr: 1 }}
                aria-label="Go back"
            >
                <ArrowBackIcon />
            </IconButton>
            
            <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    flex: 1,
                    cursor: "pointer"
                }}
            >
                <Box 
                    sx={{ 
                        position: "relative",
                        width: 40,
                        height: 40,
                    }}
                >
                    <img
                        src={participantPhotoUrl || "/default-avatar.png"}
                        alt={participantName}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <Box 
                        sx={{ 
                            position: "absolute", 
                            bottom: 0, 
                            right: 0, 
                            width: 12, 
                            height: 12, 
                            borderRadius: "50%", 
                            backgroundColor: "#4caf50",
                            border: "2px solid white" 
                        }} 
                    />
                </Box>
                
                <Box sx={{ ml: 1.5 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        {participantName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Active now
                    </Typography>
                </Box>
            </Box>
            
            <Box>
                <IconButton aria-label="Video call">
                    <VideocamOutlinedIcon />
                </IconButton>
                <IconButton aria-label="Conversation info">
                    <InfoOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};