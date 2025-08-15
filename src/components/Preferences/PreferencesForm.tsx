import {useState, useEffect, useCallback} from "react";
import {Box, Button} from "@mui/material";
import {useGetMyProfileQuery, useUpdateProfilePreferencesMutation} from "../../store/api.ts";
import AgeRangeSlider from "./AgeRangeSlider.tsx";
import GenderSelect from "./GenderSelect.tsx";
import DistanceSlider from "./DistanceSlider.tsx";

export const PreferencesForm = () => {
    const {data: myProfile, isLoading} = useGetMyProfileQuery();
    const [updateProfilePreferences] = useUpdateProfilePreferencesMutation();

    const [ageRange, setAgeRange] = useState([18, 100]);
    const [distance, setDistance] = useState(50);
    const [selectedGender, setSelectedGender] = useState(0);

    useEffect(() => {
        if (myProfile?.preferences) {
            const {minAge, maxAge, maxDistance, preferredGender} = myProfile.preferences;
            setAgeRange([minAge, maxAge]);
            setDistance(maxDistance);
            setSelectedGender(preferredGender);
        }
    }, [myProfile]);

    const handleAgeRangeChange = useCallback((newRange: [number, number]) => {
        setAgeRange(newRange);
    }, []);

    const handleDistanceChange = useCallback((newDistance: number) => {
        setDistance(newDistance);
    }, []);

    const handleGenderChange = useCallback((newGender: string) => {
        setSelectedGender(Number(newGender));
    }, []);

    const handleSubmit = useCallback(() => {
        if (!myProfile) return;
        updateProfilePreferences({
            profileId: myProfile.id,
            minAge: ageRange[0],
            maxAge: ageRange[1],
            maxDistance: distance,
            preferredGender: selectedGender
        });
    }, [myProfile, ageRange, distance, selectedGender, updateProfilePreferences]);

    if (isLoading || !myProfile) {
        return <div>Loading profile...</div>;
    }

    return (
        <Box sx={{padding: 3, maxWidth: 400, margin: 'auto'}}>
            <AgeRangeSlider
                minAge={ageRange[0]}
                maxAge={ageRange[1]}
                onChange={handleAgeRangeChange}
            />
            <DistanceSlider
                maxDistance={distance}
                onChange={handleDistanceChange}
            />
            <GenderSelect
                gender={selectedGender.toString()}
                onChange={handleGenderChange}
            />
            <Button
                variant="contained"
                fullWidth
                sx={{marginTop: 2}}
                onClick={handleSubmit}
            >
                Save preferences
            </Button>
        </Box>
    );
};
