import {Typography, Paper, styled} from "@mui/material";
import {PreferencesForm} from "./PreferencesForm.tsx";

const PreferencesContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export const Preferences = () => {
    return (
        <PreferencesContainer>
            <Typography variant="h6" gutterBottom>
                Preferences
            </Typography>
            <PreferencesForm/>
        </PreferencesContainer>
    );
};
