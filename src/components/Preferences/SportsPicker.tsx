import {Box, Checkbox, styled, Tooltip} from '@mui/material';
import {sportsIcons} from '../../utils/sportsIcons';
import {
    useAddProfileSportMutation,
    useGetMyProfileQuery,
    useGetSportsQuery,
    useRemoveProfileSportMutation
} from "../../store/api/api.ts";
import type {Sport} from "../../models/profile.ts";

const StyledCheckbox = styled(Checkbox)(() => ({
    '& .MuiSvgIcon-root': {
        fontSize: 40,
    },
}));

export const SportsPicker = () => {
    const {data: myProfile} = useGetMyProfileQuery();
    const {data: sports} = useGetSportsQuery();
    const [addProfileSport] = useAddProfileSportMutation();
    const [removeProfileSport] = useRemoveProfileSportMutation();

    const handleToggleSport = (sport: Sport) => {
        if (!myProfile) return;

        if (myProfile.sports.some((s) => s.id === sport.id)) {
            removeProfileSport({profileId: myProfile.id, sportId: sport.id});
        } else {
            addProfileSport({profileId: myProfile.id, sportId: sport.id});
        }
    };

    if (!myProfile || !sports) {
        return (
            <Box sx={{padding: 3, margin: 'auto'}}>
                <h3>Loading...</h3>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
            {sports.map(({id, name}) => {
                const Icon = sportsIcons[name] || sportsIcons['default'];
                const isChecked = myProfile.sports.some((sport) => sport.id === id);
                return (
                    <Box key={id}>
                        <Tooltip title={name} arrow>
                            <StyledCheckbox
                                checked={isChecked}
                                onChange={() => handleToggleSport({id, name} as Sport)}
                                icon={<Icon aria-label={name}/>}
                                checkedIcon={<Icon aria-label={name}/>}
                            />
                        </Tooltip>
                    </Box>
                );
            })}
        </Box>
    );
};
