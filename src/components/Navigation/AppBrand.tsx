import {NavLink} from 'react-router-dom';
import {Typography} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

interface AppBrandProps {
    size: 'mdUp' | 'xsOnly';
}

export const AppBrand = ({size}: AppBrandProps) => {
    const isMdUp = size === 'mdUp';

    return (
        <>
            <SportsSoccerIcon sx={{display: {xs: isMdUp ? 'none' : 'flex', md: isMdUp ? 'flex' : 'none'}, mr: 1}}/>
            <Typography
                variant={isMdUp ? 'h6' : 'h5'}
                noWrap
                component={NavLink}
                to="/"
                sx={{
                    mr: 2,
                    display: {xs: isMdUp ? 'none' : 'flex', md: isMdUp ? 'flex' : 'none'},
                    ...(isMdUp ? {} : {flexGrow: 1}),
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                SportyBuddies
            </Typography>
        </>
    );
};
