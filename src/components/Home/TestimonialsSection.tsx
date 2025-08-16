import {Avatar, Box, Card, Container, Fade, Grid, Typography, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import SectionTitle from '../common/SectionTitle';

const TestimonialCard = styled(Card)(({theme}) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
}));

export type Testimonial = {
    id: number | string;
    name: string;
    avatar: string;
    sport: string;
    text: string;
};

export type TestimonialsSectionProps = {
    title: string;
    items: Testimonial[];
    animate: boolean;
};

const TestimonialsSection = ({title, items, animate}: TestimonialsSectionProps) => {
    const theme = useTheme();
    return (
        <Box sx={{py: 8, backgroundColor: theme.palette.grey[50]}}>
            <Container maxWidth="lg">
                <SectionTitle variant="h3">{title}</SectionTitle>
                <Grid container spacing={4}>
                    {items.map((testimonial, index) => (
                        <Grid key={testimonial.id}>
                            <Fade in={animate} timeout={1000} style={{transitionDelay: `${index * 200}ms`}}>
                                <TestimonialCard>
                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        <Avatar src={testimonial.avatar} alt={testimonial.name}
                                                sx={{width: 64, height: 64, mr: 2}}/>
                                        <Box>
                                            <Typography variant="h6" component="h3">
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.sport} Enthusiast
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" sx={{mt: 2, fontStyle: 'italic'}}>
                                        "{testimonial.text}"
                                    </Typography>
                                </TestimonialCard>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;

