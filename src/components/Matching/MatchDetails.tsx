import {Box, Typography, styled} from '@mui/material';
import MatchSportsList from './MatchSportsList';
import type {Sport} from '../../models/profile.ts';

interface MatchDetailsProps {
    expanded: boolean;
    description: string | null;
    sports: Sport[];
}

const Details = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>(({theme, expanded}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: expanded ? theme.spacing(2) : 0,
    maxHeight: expanded ? 400 : 0,
    overflow: 'hidden',
    transition: theme.transitions.create(['max-height', 'padding']),
}));

const MatchDetails = ({expanded, description, sports}: MatchDetailsProps) => {
    return (
        <Details expanded={expanded}>
            <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                    About
                </Typography>
                <Typography variant="body1">
                    {description || 'No bio available'}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Sports
                </Typography>
                <MatchSportsList sports={sports}/>
            </Box>
        </Details>
    );
};

export default MatchDetails;
