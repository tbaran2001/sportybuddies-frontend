import {Box, Typography} from "@mui/material";
import {PreferencesForm} from "./PreferencesForm.tsx";
import { SportsForm } from "./SportsForm.tsx";

export const Preferences = () => {
    return (
        <Box flex={1}>
            <Typography variant="h3" align={"center"}>
                Your preferences
            </Typography>
            <PreferencesForm/>
            <SportsForm/>
        </Box>
    );
};
