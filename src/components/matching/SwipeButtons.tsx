import {Box, IconButton, styled} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface SwipeButtonsProps {
    onDislike: () => void;
    onLike: () => void;
    disabled?: boolean;
}

const Container = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginTop: theme.spacing(2),
}));

const ActionButton = styled(IconButton)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        transform: 'scale(1.1)',
    },
    transition: theme.transitions.create(['transform', 'background-color']),
}));

const DislikeButton = styled(ActionButton)(({theme}) => ({
    color: theme.palette.error.main,
}));

const LikeButton = styled(ActionButton)(({theme}) => ({
    color: theme.palette.success.main,
}));

const SwipeButtons = ({onDislike, onLike, disabled}: SwipeButtonsProps) => {
    return (
        <Container>
            <DislikeButton size="large" onClick={onDislike} disabled={!!disabled} aria-label="Dislike">
                <CloseIcon fontSize="large"/>
            </DislikeButton>

            <LikeButton size="large" onClick={onLike} disabled={!!disabled} aria-label="Like">
                <FavoriteIcon fontSize="large"/>
            </LikeButton>
        </Container>
    );
};

export default SwipeButtons;

