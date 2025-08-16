import {useState} from 'react';
import {Box, IconButton, Paper, styled} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PhotoCarouselProps {
    photos: string[];
}

const CarouselContainer = styled(Paper)(({theme}) => ({
    position: 'relative',
    width: '100%',
    height: 500,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        height: 400,
    },
}));

const PhotoContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
});

const Photo = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const NavigationButton = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));

const PhotoIndicator = styled(Box)(({theme}) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
}));

const IndicatorDot = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({theme, active}) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: active
        ? theme.palette.common.white
        : 'rgba(255, 255, 255, 0.5)',
}));

const PhotoCarousel = ({photos}: PhotoCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
    };


    return (
        <CarouselContainer>
            <PhotoContainer>
                <Photo src={photos[currentIndex]} alt={`Photo ${currentIndex + 1}`}/>

                {photos.length > 1 && (
                    <>
                        <NavigationButton
                            sx={{left: 16}}
                            onClick={handlePrevious}
                            aria-label="Previous photo"
                        >
                            <ArrowBackIosNewIcon/>
                        </NavigationButton>

                        <NavigationButton
                            sx={{right: 16}}
                            onClick={handleNext}
                            aria-label="Next photo"
                        >
                            <ArrowForwardIosIcon/>
                        </NavigationButton>

                        <PhotoIndicator>
                            {photos.map((_, index) => (
                                <IndicatorDot
                                    key={index}
                                    active={index === currentIndex}
                                />
                            ))}
                        </PhotoIndicator>
                    </>
                )}
            </PhotoContainer>
        </CarouselContainer>
    );
};

export default PhotoCarousel;