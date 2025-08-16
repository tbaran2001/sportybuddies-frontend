import {Box, IconButton, TextField} from "@mui/material";
import React from "react";

interface InputBoxProps {
    message: string;
    setMessage: (value: string) => void;
    onSendMessage: () => void;
    disabled?: boolean;
}

export const InputBox = ({message, setMessage, onSendMessage, disabled = false}: InputBoxProps) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendMessage();
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: "background.primary",
                borderTop: 1,
                borderColor: "divider",
            }}
        >
            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Your message..."
                    variant="outlined"
                    sx={{mr: 1}}
                    disabled={disabled}
                />
                <IconButton
                    color="primary"
                    onClick={() => !disabled && onSendMessage()}
                    aria-label="send message"
                    disabled={disabled}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </IconButton>
            </Box>
        </Box>
    );
};
