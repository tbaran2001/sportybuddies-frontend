import { Box, Typography } from "@mui/material";
import {SportsPicker} from "./SportsPicker.tsx";

export const SportsForm = () => {
    return (
        <Box sx={{padding: 3, margin: 'auto'}}>
            <Typography variant="h3" align={"center"}>
                Choose your sport activities
            </Typography>
            <SportsPicker/>
        </Box>
    );
};
