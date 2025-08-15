import {Box, Typography} from "@mui/material";
import {PreferencesForm} from "./PreferencesForm.tsx";

export const Preferences = () => {
    return (
        <Box flex={1}>
            <Typography variant="h3" align={"center"}>
                Your preferences
            </Typography>
            <PreferencesForm/>
        </Box>
    );
};
