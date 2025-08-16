import {Box, Button, Container, Typography, useTheme} from '@mui/material';

export type CtaSectionProps = {
    isAuthenticated: boolean;
    onGetStarted: () => void;
};

const CtaSection = ({isAuthenticated, onGetStarted}: CtaSectionProps) => {
    const theme = useTheme();
    return (
        <Box sx={{py: 8, backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>
            <Container maxWidth="md" sx={{textAlign: 'center'}}>
                <Typography variant="h3" component="h2" gutterBottom>
                    Ready to Find Your Sports Buddy?
                </Typography>
                <Typography variant="h6" sx={{mb: 4, opacity: 0.9}}>
                    Join thousands of sports enthusiasts who have found their perfect match on SportyBuddies.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={onGetStarted}
                    sx={{py: 1.5, px: 4, fontSize: '1.1rem', boxShadow: theme.shadows[4]}}
                >
                    {isAuthenticated ? 'Find Buddies Now' : 'Join SportyBuddies Today'}
                </Button>
            </Container>
        </Box>
    );
};

export default CtaSection;

