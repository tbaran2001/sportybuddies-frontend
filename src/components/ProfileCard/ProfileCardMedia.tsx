import {Box, CardMedia} from "@mui/material";

const defaultPhotoUrl = "https://ix-marketing.imgix.net/autotagging.png";

export const ProfileCardMedia = () => {
    return (
        <Box  style={{position: 'relative', textAlign: 'center'}} sx={{
            width: '100%',
            maxWidth: 400,
            height: 500,
            overflow: 'hidden'
        }}>
            <CardMedia
                component="img"
                image={defaultPhotoUrl}
                alt="User Profile Picture"
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Box>
    );
};
