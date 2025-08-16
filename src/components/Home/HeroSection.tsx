import {Box, Button, Container, Fade, Grid, Typography, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';

const HeroRoot = styled(Box)(({theme}) => ({
    position: 'relative',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=700&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
        height: '60vh',
    },
}));

export type HeroSectionProps = {
    isAuthenticated: boolean;
    onGetStarted: () => void;
};

const HeroSection = ({isAuthenticated, onGetStarted}: HeroSectionProps) => {
    const theme = useTheme();
    return (
        <HeroRoot>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid>
                        <Fade in={true} timeout={1000}>
                            <Box>
                                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                                    Find Your Perfect Sports Buddy
                                </Typography>
                                <Typography variant="h5" component="p" sx={{mb: 4, maxWidth: '80%'}}>
                                    Connect with like-minded sports enthusiasts in your area and never play alone again.
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    onClick={onGetStarted}
                                    sx={{py: 1.5, px: 4, fontSize: '1.1rem', boxShadow: theme.shadows[4]}}
                                >
                                    {isAuthenticated ? 'Find Buddies' : 'Get Started'}
                                </Button>
                            </Box>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </HeroRoot>
    );
};

export default HeroSection;
