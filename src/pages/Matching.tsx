import {Box, IconButton, Stack, styled, CircularProgress} from "@mui/material";
import {FavoriteBorderOutlined, ThumbDownOutlined} from '@mui/icons-material';
import {useGetMyProfileQuery, useGetRandomMatchQuery, useUpdateMatchSwipeMutation} from "../store/api.ts";
import { useEffect } from "react";
import {MatchProfileCard} from "../components/Matching/MatchProfileCard.tsx";

const SwipeBox = styled(Box)(() => ({
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const MatchingPage = () => {
    const {data: myProfile} = useGetMyProfileQuery();
    const {
        data: randomMatch,
        isLoading: isLoadingRandomMatch,
        refetch
    } = useGetRandomMatchQuery(myProfile?.id || "", {skip: !myProfile});
    const [updateMatch] = useUpdateMatchSwipeMutation();

    useEffect(() => {
        if (myProfile && !randomMatch) {
            refetch();
        }
    }, [myProfile, randomMatch, refetch]);

    if (isLoadingRandomMatch) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress/>
            </Box>
        );
    }

    if (!randomMatch) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                No matches available.
            </Box>
        );
    }

    const swipe = async (direction: number) => {
        await updateMatch({matchId: randomMatch.id, swipe: direction});
    };


    return (
        <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
            <SwipeBox>
                <IconButton
                    onClick={() => swipe(2)}
                    aria-label="Swipe Left"
                    size="large"
                >
                    <ThumbDownOutlined fontSize="large"/>
                </IconButton>
            </SwipeBox>
            <Box display="flex" justifyContent="center" alignItems="center" position="relative">
                <MatchProfileCard/>
            </Box>
            <SwipeBox>
                <IconButton
                    onClick={() => swipe(1)}
                    aria-label="Swipe Right"
                    size="large"
                >
                    <FavoriteBorderOutlined fontSize="large"/>
                </IconButton>
            </SwipeBox>
        </Stack>
    );
};
