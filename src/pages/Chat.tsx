import {Box, Paper, styled} from "@mui/material";
import {ChatHeader} from "../components/Chat/ChatHeader.tsx";

const StyledPaper = styled(Paper)(() => ({
    height: "85vh",
    display: "flex",
    overflow: "hidden",
}));

export const ChatPage = () => {
    return (
        <Box flex={4}>
            <StyledPaper elevation={10}>
                <Box sx={{flex: 1, display: "flex", flexDirection: "column"}}>
                    <ChatHeader/>
                </Box>
            </StyledPaper>
        </Box>
    );
};
