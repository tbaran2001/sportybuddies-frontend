import {type ChangeEvent, memo, useCallback} from "react";
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

const MIN_AGE = 18;
const MAX_AGE = 120;
const normalizeRange = (value: [number, number], changedIndex?: number): [number, number] => {
    let [lo, hi] = value;

    lo = Math.min(Math.max(lo, MIN_AGE), MAX_AGE);
    hi = Math.min(Math.max(hi, MIN_AGE), MAX_AGE);

    if (lo > hi) {
        if (changedIndex === 0) {
            hi = lo;
        } else if (changedIndex === 1) {
            lo = hi;
        } else {
            [lo, hi] = [Math.min(lo, hi), Math.max(lo, hi)];
        }
    }
    return [lo, hi];
};

const AgeRangeSlider = ({minAge, maxAge, onChange}: AgeRangeSliderProps) => {
    console.log("AgeRangeSlider rendered");
    const value: [number, number] = [minAge, maxAge];

    const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
        const rangeValue = newValue as [number, number];
        onChange(normalizeRange(rangeValue));
    }, [onChange]);

    const handleInputChange = useCallback((index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const next: [number, number] = [minAge, maxAge];
        next[index] = Number(event.target.value);
        onChange(normalizeRange(next, index));
    }, [minAge, maxAge, onChange]);

    const handleBlur = useCallback(() => {
        onChange(normalizeRange([minAge, maxAge]));
    }, [minAge, maxAge, onChange]);

    return (
        <Box m={2}>
            <Typography gutterBottom>Preferred age</Typography>
            <Slider
                getAriaLabel={() => 'Age range slider'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={MIN_AGE}
                max={MAX_AGE}
                marks={marks}
                disableSwap
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
                            min: MIN_AGE,
                            max: MAX_AGE
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
                            min: MIN_AGE,
                            max: MAX_AGE
                        }
                    }}
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};

export default memo(AgeRangeSlider);
