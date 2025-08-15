import {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import {AgeRangeSlider} from "./AgeRangeSlider.tsx";
import {DistanceSlider} from "./DistanceSlider.tsx";
import {GenderSelect} from "./GenderSelect.tsx";
import {useGetMyProfileQuery, useUpdateProfilePreferencesMutation} from "../../store/api.ts";

export const PreferencesForm = () => {
    const {data: myProfile, isLoading} = useGetMyProfileQuery();
    const [updateProfilePreferences] = useUpdateProfilePreferencesMutation();

    const [ageRange, setAgeRange] = useState([18, 100]);
    const [distance, setDistance] = useState(50);
    const [selectedGender, setSelectedGender] = useState(3);

    useEffect(() => {
        if (myProfile?.preferences) {
            const {minAge, maxAge, maxDistance, preferredGender} = myProfile.preferences;
            setAgeRange([minAge, maxAge]);
            setDistance(maxDistance);
            setSelectedGender(preferredGender);
        }
    }, [myProfile]);

    if (isLoading || !myProfile) {
        return <div>Loading profile...</div>;
    }

    const handleSubmit = () => {
        updateProfilePreferences({
            profileId: myProfile.id,
            minAge: ageRange[0],
            maxAge: ageRange[1],
            maxDistance: distance,
            preferredGender: selectedGender
        });
    };
    return (
        <Box sx={{padding: 3, maxWidth: 400, margin: 'auto'}}>
            <AgeRangeSlider
                minAge={ageRange[0]}
                maxAge={ageRange[1]}
                onChange={(newRange) => setAgeRange(newRange)}
            />
            <DistanceSlider
                maxDistance={distance}
                onChange={(newDistance) => setDistance(newDistance)}
            />
            <GenderSelect
                gender={selectedGender.toString()}
                onChange={(newGender) => setSelectedGender(Number(newGender))}
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
