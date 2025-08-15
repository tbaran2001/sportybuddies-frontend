import {type ChangeEvent, memo, useCallback} from "react";
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

const DistanceSliderComponent = ({maxDistance, onChange}: DistanceSliderProps) => {

    console.log("DistanceSlider rendered");
    const value = maxDistance;

    const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
        const numValue = Array.isArray(newValue) ? newValue[0] : newValue;
        onChange(numValue);
    }, [onChange]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue < 1) newValue = 1;
        if (newValue > 100) newValue = 100;
        onChange(newValue);
    }, [onChange]);

    const handleBlur = useCallback(() => {
        let newValue = value;
        if (newValue < 1) newValue = 1;
        if (newValue > 100) newValue = 100;
        onChange(newValue);
    }, [value, onChange]);

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

export const DistanceSlider = memo(DistanceSliderComponent);
