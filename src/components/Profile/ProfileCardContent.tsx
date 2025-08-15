import {Box, CardContent, Tooltip} from "@mui/material";
import {sportsIcons} from "../../utils/sportsIcons";

const profileSports = [
    {id: 1, name: 'Gym'},
    {id: 2, name: 'Boxing'},
    {id: 3, name: 'Surfing'},
];

export const ProfileCardContent = () => {
    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                {profileSports.map(({id, name}) => (
                    <Tooltip key={id} title={name} arrow>
                        <Box component={sportsIcons[name] || sportsIcons['default']}/>
                    </Tooltip>
                ))}
            </Box>
        </CardContent>
    );
};
