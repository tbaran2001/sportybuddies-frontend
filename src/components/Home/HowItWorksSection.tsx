import {Avatar, Box, Container, Fade, Grid, Stack, Typography, useTheme} from '@mui/material';
import SectionTitle from './SectionTitle.tsx';

export type HowStep = {
    step: number;
    title: string;
    description: string;
};

export type HowItWorksSectionProps = {
    title: string;
    imageUrl: string;
    steps: HowStep[];
    animate: boolean;
};

const HowItWorksSection = ({title, imageUrl, steps, animate}: HowItWorksSectionProps) => {
    const theme = useTheme();
    return (
        <Box sx={{py: 8, backgroundColor: theme.palette.background.paper}}>
            <Container maxWidth="lg">
                <SectionTitle variant="h3">{title}</SectionTitle>
                <Grid container spacing={4} alignItems="center">
                    <Grid>
                        <Fade in={animate} timeout={1000}>
                            <Box
                                component="img"
                                src={imageUrl}
                                alt="Sports activity"
                                sx={{width: '100%', height: 'auto', borderRadius: 2, boxShadow: theme.shadows[5]}}
                            />
                        </Fade>
                    </Grid>
                    <Grid>
                        <Stack spacing={4}>
                            {steps.map((step, index) => (
                                <Fade key={step.step} in={animate} timeout={1000}
                                      style={{transitionDelay: `${index * 200}ms`}}>
                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                        <Avatar
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                width: 56,
                                                height: 56,
                                                mr: 2,
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {step.step}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h5" component="h3" gutterBottom>
                                                {step.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {step.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Fade>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HowItWorksSection;

