import {useState} from 'react';
import {useSelector} from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Container,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {selectCurrentToken} from "../../store/authSlice.ts";
import {AppBrand} from './AppBrand';
import {UserMenu} from './UserMenu';
import {NavPagesButtons} from './NavPagesButtons';

export const MainNavigation = () => {
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOpenNavMenu = () => setMobileOpen(true);
    const handleCloseNavMenu = () => setMobileOpen(false);

    const handleNavigate = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const publicPages = [
        {name: 'Home', path: '/'}
    ];

    const privatePages = [
        {name: 'Matching', path: '/matching'},
        {name: 'Buddies', path: '/buddies'},
        {name: 'Chat', path: '/chat'},
    ];

    const userSettings = [
        {name: 'Profile', path: '/profiles/me'},
        {name: 'Logout', path: '/logout'}
    ];

    const drawer = (
        <Box onClick={handleCloseNavMenu} sx={{textAlign: 'center'}}>
            <AppBrand size="xsOnly"/>
            <Divider/>
            <List>
                {publicPages.map((page) => (
                    <ListItem key={page.name} disablePadding>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            onClick={() => handleNavigate(page.path)}
                        >
                            <ListItemText primary={page.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                {token && privatePages.map((page) => (
                    <ListItem key={page.name} disablePadding>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            onClick={() => handleNavigate(page.path)}
                        >
                            <ListItemText primary={page.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                {!token && (
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            onClick={() => handleNavigate('/auth')}
                        >
                            <ListItemText primary="Login"/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <AppBrand size="mdUp"/>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={mobileOpen}
                                onClose={handleCloseNavMenu}
                                ModalProps={{keepMounted: true}}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Box>

                        <AppBrand size="xsOnly"/>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <NavPagesButtons pages={publicPages} onClose={handleCloseNavMenu}/>
                            {token && (
                                <NavPagesButtons pages={privatePages} onClose={handleCloseNavMenu}/>
                            )}
                        </Box>

                        {token ? (
                            <UserMenu settings={userSettings} onNavigate={handleNavigate}/>
                        ) : (
                            <Button
                                component={NavLink}
                                to="/auth"
                                color="inherit"
                                variant="outlined"
                                sx={{my: 1, mx: 1.5, '&.active': {fontWeight: 'bold'}}}
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};