import {useState} from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';

export interface SettingItem {
    name: string;
    path: string;
}

interface UserMenuProps {
    settings: SettingItem[];
    onNavigate: (path: string) => void;
}

export const UserMenu = ({settings, onNavigate}: UserMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleItemClick = (path: string) => {
        onNavigate(path);
        handleClose();
    };

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{p: 0}}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg"/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => handleItemClick(setting.path)}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
