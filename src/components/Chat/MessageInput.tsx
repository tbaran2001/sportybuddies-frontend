import {useState, type KeyboardEvent} from 'react';
import {
    Box,
    TextField,
    IconButton,
    CircularProgress,
    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
    isLoading: boolean;
    disabled: boolean;
}

// Styled components
const InputContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`
}));

const MessageTextField = styled(TextField)(({theme}) => ({
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
        borderRadius: 20,
        backgroundColor: theme.palette.background.paper,
        '& fieldset': {
            borderColor: theme.palette.divider
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper
        }
    }
}));

const MessageInput = ({onSendMessage, isLoading, disabled}: MessageInputProps) => {
    const [message, setMessage] = useState('');

    // Handle sending a message
    const handleSendMessage = () => {
        if (message.trim() && !isLoading && !disabled) {
            onSendMessage(message);
            setMessage('');
        }
    };

    // Handle pressing Enter to send a message
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <InputContainer>
            <IconButton
                color="primary"
                aria-label="add emoji"
                disabled={disabled}
                sx={{mr: 1}}
            >
                <EmojiEmotionsIcon/>
            </IconButton>

            <MessageTextField
                placeholder="Type a message..."
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                InputProps={{
                    sx: {py: 0.5, px: 2}
                }}
            />

            <IconButton
                color="primary"
                aria-label="send message"
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading || disabled}
                sx={{ml: 1}}
            >
                {isLoading ? <CircularProgress size={24}/> : <SendIcon/>}
            </IconButton>
        </InputContainer>
    );
};

export default MessageInput;