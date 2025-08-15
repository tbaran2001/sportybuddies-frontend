import {Box, Typography} from "@mui/material";

export const ChatHeader = () => {
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
            }}
        >
            <img
                src="/default-avatar.png" // Replace with dynamic source if needed
                alt={"participantName"}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
            />
            <Box sx={{ml: 2}}>
                <Typography variant="subtitle1" fontWeight="medium">
                    {"participantName"}
                </Typography>
            </Box>
        </Box>
    );
};
