import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import type {SelectChangeEvent} from "@mui/material";
import {memo, useCallback} from "react";

interface GenderSelectProps {
    gender: string;
    onChange: (value: string) => void;
}

const GenderSelect = ({gender, onChange}: GenderSelectProps) => {
    const handleChange = useCallback((event: SelectChangeEvent) => {
        onChange(event.target.value);
    }, [onChange]);

    return (
        <Box m={2}>
            <Typography>Looking for</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="gender-select-label"
                    value={gender}
                    onChange={handleChange}
                    label="Gender"
                >
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="1">Male</MenuItem>
                    <MenuItem value="2">Female</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default memo(GenderSelect);
