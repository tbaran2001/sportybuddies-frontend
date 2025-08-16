import {Paper, styled} from '@mui/material';
import type {PropsWithChildren} from 'react';

const Card = styled(Paper)(({theme}) => ({
    position: 'relative',
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
}));

const MatchCardContainer = ({children}: PropsWithChildren) => {
    return <Card>{children}</Card>;
};

export default MatchCardContainer;
