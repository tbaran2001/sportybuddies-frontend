import type {ReactNode} from "react";
import {Box, Typography} from '@mui/material';
import {keyframes} from '@emotion/react';
import SportsIcon from '@mui/icons-material/Sports';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface PageContentProps {
    title?: string;
    children?: ReactNode;
}

const pickIconByTitle = (title?: string) => {
    if (!title) return SportsIcon;
    const t = title.toLowerCase();
    if (t.includes('profile')) return AccountCircleIcon;
    if (t.includes('buddies')) return GroupIcon;
    if (t.includes('chat')) return ChatBubbleOutlineIcon;
    if (t.includes('error') || t.includes('oops')) return ErrorOutlineIcon;
    return SportsIcon;
}

const growX = keyframes`
    from {
        transform: scaleX(0);
        opacity: .4;
    }
    to {
        transform: scaleX(1);
        opacity: 1;
    }
`;

const PageContent = ({title, children}: PageContentProps) => {
    const Icon = pickIconByTitle(title);
    return (
        <Box>
            {title && (
                <Box sx={{mb: 2}}>
                    <Box sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.25,
                        borderRadius: 2,
                        background: `linear-gradient(180deg, rgba(158,221,183,0.06), rgba(42,122,104,0.04))`,
                        border: `1px solid ${theme.palette.divider}30`,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    })}>
                        <Box sx={(theme) => ({
                            width: 8,
                            height: 32,
                            borderRadius: 2,
                            background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            boxShadow: `0 0 12px rgba(82, 195, 179, 0.25)`
                        })}/>
                        <Icon sx={{color: 'primary.main'}} fontSize="medium"/>
                        <Typography variant="h3" component="h1" sx={{fontWeight: 700, letterSpacing: 0.2}}>
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={(theme) => ({
                        mt: 1,
                        height: 2,
                        width: '100%',
                        borderRadius: 1,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                        transformOrigin: 'left',
                        animation: `${growX} 700ms ease-out`
                    })}
                    />
                </Box>
            )}
            {children}
        </Box>
    )
}

export default PageContent;