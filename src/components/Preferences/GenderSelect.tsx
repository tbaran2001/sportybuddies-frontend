import {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import type {SelectChangeEvent} from "@mui/material";

interface GenderSelectProps {
    gender: string;
    onChange: (value: string) => void;
}

export const GenderSelect = ({gender, onChange}: GenderSelectProps) => {
    const [value, setValue] = useState(gender);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <Box m={2}>
            <Typography>Looking for</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="gender-select-label"
                    value={value}
                    onChange={handleChange}
                    label="Gender"
                >
                    <MenuItem value={3}>All</MenuItem>
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
