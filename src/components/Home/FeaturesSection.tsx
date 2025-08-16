import {Box, Card, CardContent, Container, Fade, Grid, Typography, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import SectionTitle from '../common/SectionTitle';
import type {ReactNode} from 'react';

const FeatureCard = styled(Card)(({theme}) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

export type Feature = {
    id: number | string;
    title: string;
    description: string;
    icon: ReactNode;
    image: string;
};

export type FeaturesSectionProps = {
    title: string;
    items: Feature[];
    animate: boolean;
};

const FeaturesSection = ({title, items, animate}: FeaturesSectionProps) => {
    const theme = useTheme();
    return (
        <Box sx={{py: 8, backgroundColor: theme.palette.background.default}}>
            <Container maxWidth="lg">
                <SectionTitle variant="h3">{title}</SectionTitle>
                <Grid container spacing={4}>
                    {items.map((feature, index) => (
                        <Grid key={feature.id}>
                            <Fade in={animate} timeout={1000} style={{transitionDelay: `${index * 200}ms`}}>
                                <FeatureCard>
                                    <Box sx={{
                                        height: 200,
                                        backgroundImage: `url(${feature.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}/>
                                    <CardContent sx={{flexGrow: 1, textAlign: 'center', p: 3}}>
                                        <Box sx={{mb: 2}}>{feature.icon}</Box>
                                        <Typography variant="h5" component="h3" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </FeatureCard>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturesSection;
