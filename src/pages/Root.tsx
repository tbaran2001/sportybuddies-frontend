import {Outlet} from "react-router-dom";
import {MainNavigation} from "../components/Navigation/MainNavigation.tsx";
import {Box, Container} from "@mui/material";

const RootLayout = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <MainNavigation/>
            <Container component="main" maxWidth={false} sx={{
                flexGrow: 1,
                py: 4,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Outlet/>
            </Container>
        </Box>
    )
}

export default RootLayout;