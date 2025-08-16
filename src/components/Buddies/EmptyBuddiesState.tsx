import {Box, Button, Typography} from "@mui/material";

interface EmptyBuddiesStateProps {
    onFindMatches: () => void;
}

export const EmptyBuddiesState = ({onFindMatches}: EmptyBuddiesStateProps) => (
    <Box textAlign="center" my={4}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
            You don't have any buddies yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Go to the Matching page to find new buddies!
        </Typography>
        <Button variant="contained" sx={{mt: 2}} onClick={onFindMatches}>
            Find Matches
        </Button>
    </Box>
);

export default EmptyBuddiesState;

