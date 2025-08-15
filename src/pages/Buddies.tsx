import {Box, Typography, List, Paper} from "@mui/material";
import {useGetMyProfileQuery, useGetProfileBuddiesQuery} from "../store/api.ts";
import {BuddyItem} from "../components/Buddies/BuddyItem.tsx";

export const BuddiesPage = () => {
    const {data: myProfile} = useGetMyProfileQuery();
    const {
        data: buddies,
        isLoading: isLoadingBuddies
    } = useGetProfileBuddiesQuery(myProfile?.id || "", {skip: !myProfile});

    if (isLoadingBuddies || !buddies) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h6">Loading your buddies...</Typography>
            </Box>
        );
    }

    return (
        <Box flex={4}>
            <Paper>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Your Buddies
                </Typography>
                <List>
                    {buddies.map((buddy) => (
                        <BuddyItem
                            key={buddy.id}
                            buddy={buddy}
                        />
                    ))}
                </List>
            </Paper>
        </Box>
    );
};
