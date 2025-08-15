import {useState, type ChangeEvent} from "react";
import {Box, Slider, TextField, Typography} from "@mui/material";

interface DistanceSliderProps {
    maxDistance: number;
    onChange: (value: number) => void;
}

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 100,
        label: '100',
    },
];

export const DistanceSlider = ({maxDistance, onChange}: DistanceSliderProps) => {
    const [value, setValue] = useState(maxDistance);

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        const numValue = Array.isArray(newValue) ? newValue[0] : newValue;
        setValue(numValue);
        onChange(numValue);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue < 1) newValue = 1;
        if (newValue > 100) newValue = 100;
        setValue(newValue);
        onChange(newValue);
    };

    const handleBlur = () => {
        if (value < 1) setValue(1);
        if (value > 100) setValue(100);
        onChange(value);
    };

    return (
        <Box m={2}>
            <Typography gutterBottom>Preferred distance</Typography>
            <Slider
                getAriaLabel={() => 'Distance slider'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={1}
                max={100}
                marks={marks}
            />
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
                <TextField
                    label="Km"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="number"
                    slotProps={{
                        htmlInput: {
                            min: 1,
                            max: 100
                        }
                    }}
                    variant="outlined"
                    fullWidth
                />
            </Box>
        </Box>
    );
};
