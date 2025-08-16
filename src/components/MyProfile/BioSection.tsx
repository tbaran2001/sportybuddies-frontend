import {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    IconButton,
    styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface BioSectionProps {
    bio: string | null;
    onSave: (newBio: string) => void;
    maxLength?: number;
}

const BioContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
}));

const EditButton = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
}));

const CharacterCounter = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'error',
})<{ error: boolean }>(({theme, error}) => ({
    textAlign: 'right',
    fontSize: '0.75rem',
    color: error ? theme.palette.error.main : theme.palette.text.secondary,
}));

const BioSection = ({bio, onSave, maxLength = 500}: BioSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState(bio || '');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setBioText(bio || '');
        setIsEditing(false);
    };

    const handleSave = () => {
        onSave(bioText);
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length <= maxLength) {
            setBioText(value);
        }
    };

    const isOverLimit = bioText.length > maxLength;
    const remainingChars = maxLength - bioText.length;

    return (
        <BioContainer>
            <Typography variant="h6" gutterBottom>
                About Me
            </Typography>

            {isEditing ? (
                <Stack spacing={2}>
                    <TextField
                        multiline
                        fullWidth
                        minRows={4}
                        maxRows={8}
                        value={bioText}
                        onChange={handleChange}
                        placeholder="Tell others about yourself..."
                        error={isOverLimit}
                        helperText={isOverLimit ? `Character limit exceeded by ${Math.abs(remainingChars)}` : ''}
                    />

                    <CharacterCounter error={isOverLimit}>
                        {remainingChars} characters remaining
                    </CharacterCounter>

                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={isOverLimit || bioText.length === 0}
                        >
                            Save
                        </Button>
                    </Box>
                </Stack>
            ) : (
                <>
                    <Typography variant="body1">
                        {bio || 'No bio added yet. Tell others about yourself!'}
                    </Typography>

                    <EditButton
                        size="small"
                        onClick={handleEdit}
                        aria-label="Edit bio"
                    >
                        <EditIcon fontSize="small"/>
                    </EditButton>
                </>
            )}
        </BioContainer>
    );
};

export default BioSection;