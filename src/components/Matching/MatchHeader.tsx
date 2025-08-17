import {Box, Button, Typography, styled} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface MatchHeaderProps {
    name: string;
    age: number;
    distanceKm?: number;
    showLocation?: boolean;
    expanded: boolean;
    onToggle: () => void;
}

const Overlay = styled(Box)(({theme}) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    color: theme.palette.common.white,
}));

const ExpandButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(1),
    color: theme.palette.common.white,
    textTransform: 'none',
}));

const MatchHeader = ({name, age, distanceKm, showLocation, expanded, onToggle}: MatchHeaderProps) => {
    const displayDistanceKm = typeof distanceKm === 'number' && !Number.isNaN(distanceKm)
        ? Math.max(1, Math.round(distanceKm))
        : null;

    return (
        <Overlay>
            <Box display="flex" alignItems="baseline" gap={1}>
                <Typography variant="h5" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="h6">{age}</Typography>
            </Box>

            {showLocation && displayDistanceKm !== null && (
                <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                    <LocationOnIcon fontSize="small"/>
                    <Typography variant="body2">{displayDistanceKm} km</Typography>
                </Box>
            )}

            <ExpandButton onClick={onToggle} endIcon={expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}>
                {expanded ? 'Show less' : 'Show more'}
            </ExpandButton>
        </Overlay>
    );
};

export default MatchHeader;
