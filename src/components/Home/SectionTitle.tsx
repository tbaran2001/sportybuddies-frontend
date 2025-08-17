import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const SectionTitle = styled(Typography)(({theme}) => ({
    position: 'relative',
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -16,
        left: '50%',
        width: 80,
        height: 4,
        backgroundColor: theme.palette.primary.main,
        transform: 'translateX(-50%)',
    },
}));

export default SectionTitle;

