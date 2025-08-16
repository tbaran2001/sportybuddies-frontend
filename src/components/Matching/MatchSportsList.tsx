import {Box, Typography, styled} from '@mui/material';
import type {Sport} from '../../models/profile.ts';

interface MatchSportsListProps {
    sports: Sport[];
}

const SportsContainer = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(1),
}));

const SportChip = styled(Box)(({theme}) => ({
    display: 'inline-block',
    padding: theme.spacing(0.5, 1.5),
    margin: theme.spacing(0.5),
    borderRadius: 16,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
}));

const MatchSportsList = ({sports}: MatchSportsListProps) => {
    if (sports.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                No sports listed
            </Typography>
        );
    }

    return (
        <SportsContainer>
            <Box display="flex" flexWrap="wrap">
                {sports.map((sport) => (
                    <SportChip key={sport.id}>
                        {sport.name}
                    </SportChip>
                ))}
            </Box>
        </SportsContainer>
    );
};

export default MatchSportsList;