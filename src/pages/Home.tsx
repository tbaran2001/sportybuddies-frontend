import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {selectCurrentToken} from "../store/authSlice.ts";
import {getPhotosByActivity} from '../utils/samplePhotos';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import CtaSection from '../components/Home/CtaSection';

const testimonials = [
    {
        id: 1,
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        sport: 'Basketball',
        text: 'SportyBuddies helped me find a regular basketball group in my area. Now I play twice a week with an amazing team!',
    },
    {
        id: 2,
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        sport: 'Yoga',
        text: 'I moved to a new city and was looking for a yoga partner. Within a week on SportyBuddies, I found someone who matches my skill level perfectly.',
    },
    {
        id: 3,
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        sport: 'Running',
        text: 'Finding running partners used to be so difficult until I discovered SportyBuddies. The app matched me with people who run at my pace and schedule.',
    },
];

const features = [
    {
        id: 1,
        title: 'Find Your Perfect Match',
        description: 'Our smart matching algorithm connects you with people who share your sports interests, skill level, and availability.',
        icon: <PeopleIcon fontSize="large" color="primary"/>,
        image: getPhotosByActivity('ball_sports')[0],
    },
    {
        id: 2,
        title: 'Connect Anywhere',
        description: 'Discover sports buddies in your neighborhood or when traveling to new places. Stay active wherever you go!',
        icon: <LocationOnIcon fontSize="large" color="primary"/>,
        image: getPhotosByActivity('outdoor')[0],
    },
    {
        id: 3,
        title: 'Chat & Plan',
        description: 'Easily communicate with your matches, plan activities, and schedule your next sports session.',
        icon: <ChatIcon fontSize="large" color="primary"/>,
        image: getPhotosByActivity('gym')[0],
    },
];

const howItWorks = [
    {
        step: 1,
        title: 'Create Your Profile',
        description: 'Sign up and tell us about your favorite sports, skill level, and availability.',
    },
    {
        step: 2,
        title: 'Get Matched',
        description: 'Our algorithm will suggest potential sports buddies based on your preferences.',
    },
    {
        step: 3,
        title: 'Connect & Play',
        description: 'Chat with your matches, schedule activities, and enjoy sports together!',
    },
];

const HomePage = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const [animateFeatures, setAnimateFeatures] = useState(false);
    const [animateHowItWorks, setAnimateHowItWorks] = useState(false);
    const [animateTestimonials, setAnimateTestimonials] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition > windowHeight * 0.2) {
                setAnimateFeatures(true);
            }

            if (scrollPosition > windowHeight * 0.5) {
                setAnimateHowItWorks(true);
            }

            if (scrollPosition > windowHeight * 0.8) {
                setAnimateTestimonials(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStarted = () => {
        if (token) {
            navigate('/matching');
        } else {
            navigate('/auth');
        }
    };

    return (
        <Box sx={{overflow: 'hidden'}}>
            <HeroSection isAuthenticated={!!token} onGetStarted={handleGetStarted}/>

            <FeaturesSection title="Why Choose SportyBuddies?" items={features} animate={animateFeatures}/>

            <HowItWorksSection
                title="How It Works"
                imageUrl={getPhotosByActivity('water_sports')[0]}
                steps={howItWorks}
                animate={animateHowItWorks}
            />

            <TestimonialsSection title="What Our Users Say" items={testimonials} animate={animateTestimonials}/>

            <CtaSection isAuthenticated={!!token} onGetStarted={handleGetStarted}/>
        </Box>
    );
};

export default HomePage;
