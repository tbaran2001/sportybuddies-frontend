import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Avatar,
    styled
} from '@mui/material';
import type {Sport} from '../../models/profile.ts';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsIcon from '@mui/icons-material/Sports';
import SurfingIcon from '@mui/icons-material/Surfing';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

interface SportsListProps {
    userSports: Sport[];
    allSports: Sport[];
    onToggleSport: (sport: Sport, isSelected: boolean) => void;
}

const SportsContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const SportChip = styled(Chip)<{ selected?: boolean }>(({theme, selected}) => ({
    margin: theme.spacing(0.5),
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
    color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    '&:hover': {
        backgroundColor: selected
            ? theme.palette.primary.dark
            : theme.palette.action.hover,
    },
    transition: theme.transitions.create(['background-color', 'box-shadow']),
}));

// Map sport names to icons
const getSportIcon = (sportName: string) => {
    const name = sportName.toLowerCase();

    switch (name) {
        case 'gym':
            return <FitnessCenterIcon/>;
        case 'boxing':
            return <SportsKabaddiIcon/>;
        case 'surfing':
            return <SurfingIcon/>;
        case 'basketball':
            return <SportsBasketballIcon/>;
        case 'snowboarding':
        case 'skiing':
            return <DownhillSkiingIcon/>;
        case 'hiking':
            return <HikingIcon/>;
        case 'yoga':
            return <SelfImprovementIcon/>;
        case 'cycling':
            return <DirectionsBikeIcon/>;
        case 'swimming':
            return <PoolIcon/>;
        case 'tennis':
            return <SportsTennisIcon/>;
        case 'running':
            return <DirectionsRunIcon/>;
        default:
            return <SportsIcon/>;
    }
};

const SportsList = ({userSports, allSports, onToggleSport}: SportsListProps) => {
    // Create a map of user sports for easy lookup
    const userSportIds = new Set(userSports.map(sport => sport.id));

    const handleSportClick = (sport: Sport) => {
        const isCurrentlySelected = userSportIds.has(sport.id);
        onToggleSport(sport, !isCurrentlySelected);
    };

    return (
        <SportsContainer>
            <Typography variant="h6" gutterBottom>
                My Sports
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
                Select the sports you're interested in
            </Typography>

            <Box>
                <Grid container spacing={1}>
                    {allSports.map((sport) => {
                        const isSelected = userSportIds.has(sport.id);

                        return (
                            <Grid key={sport.id}>
                                <SportChip
                                    avatar={<Avatar>{getSportIcon(sport.name)}</Avatar>}
                                    label={sport.name}
                                    onClick={() => handleSportClick(sport)}
                                    selected={isSelected}
                                    variant={isSelected ? "filled" : "outlined"}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </SportsContainer>
    );
};

export default SportsList;