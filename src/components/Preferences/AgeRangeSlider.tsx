import {type ChangeEvent} from "react";
import {Box, Slider, TextField, Typography} from "@mui/material";

interface AgeRangeSliderProps {
    minAge: number;
    maxAge: number;
    onChange: (value: [number, number]) => void;
}

const marks = [
    {
        value: 18,
        label: '18',
    },
    {
        value: 120,
        label: '120',
    },
];

export const AgeRangeSlider = ({minAge, maxAge, onChange}: AgeRangeSliderProps) => {
    const value: [number, number] = [minAge, maxAge];

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        const rangeValue = newValue as [number, number];
        onChange(rangeValue);
    };

    const handleInputChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue: [number, number] = [minAge, maxAge];
        newValue[index] = Number(event.target.value);

        if (newValue[0] < 18) newValue[0] = 18;
        if (newValue[1] > 120) newValue[1] = 120;
        if (newValue[0] > newValue[1]) newValue[index === 0 ? 1 : 0] = newValue[index];
        onChange(newValue);
    };

    const handleBlur = () => {
        const newValue: [number, number] = [minAge, maxAge];
        if (newValue[0] < 18) newValue[0] = 18;
        if (newValue[1] > 120) newValue[1] = 120;
        onChange(newValue);
    };

    return (
        <Box m={2}>
            <Typography gutterBottom>Preferred age</Typography>
            <Slider
                getAriaLabel={() => 'Age range slider'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={18}
                max={120}
                marks={marks}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
                <TextField
                    label="Min"
                    value={value[0]}
                    onChange={handleInputChange(0)}
                    onBlur={handleBlur}
                    type="number"
                    slotProps={{
                        htmlInput: {
                            min: 18,
                            max: 120
                        }
                    }}
                    variant="outlined"
                />
                <TextField
                    label="Max"
                    value={value[1]}
                    onChange={handleInputChange(1)}
                    onBlur={handleBlur}
                    type="number"
                    slotProps={{
                        htmlInput: {
                            min: 18,
                            max: 120
                        }
                    }}
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};
