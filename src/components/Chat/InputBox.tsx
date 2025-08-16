import {Box, IconButton, TextField, InputAdornment, styled} from "@mui/material";
import React from "react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

interface InputBoxProps {
    message: string;
    setMessage: (value: string) => void;
    onSendMessage: () => void;
    disabled?: boolean;
}

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: '#f0f2f5',
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
    },
}));

export const InputBox = ({message, setMessage, onSendMessage, disabled = false}: InputBoxProps) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendMessage();
        }
    };

    const handleSend = () => {
        if (!disabled && message.trim()) {
            onSendMessage();
        }
    };

    return (
        <Box
            sx={{
                p: 1.5,
                backgroundColor: "#ffffff",
                borderTop: 1,
                borderColor: "divider",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton 
                    color="primary" 
                    aria-label="add attachment"
                    disabled={disabled}
                    sx={{ mr: 1 }}
                >
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
                
                <StyledTextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Aa"
                    variant="outlined"
                    size="small"
                    disabled={disabled}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    edge="end" 
                                    disabled={disabled}
                                    sx={{ mr: -0.5 }}
                                >
                                    <SentimentSatisfiedAltOutlinedIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                {message.trim() ? (
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        aria-label="send message"
                        disabled={disabled}
                        sx={{ ml: 1, color: "#0084ff" }}
                    >
                        <SendRoundedIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        color="primary"
                        aria-label="send thumbs up"
                        disabled={disabled}
                        sx={{ ml: 1, color: "#0084ff" }}
                    >
                        <ThumbUpAltRoundedIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};