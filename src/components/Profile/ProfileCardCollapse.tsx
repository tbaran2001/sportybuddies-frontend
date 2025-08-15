import {Button, CardContent, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useGetMyProfileQuery, useUpdateProfilePartialMutation} from "../../store/api.ts";

export const ProfileCardCollapse = () => {
    const {data: myProfile, isLoading: isLoadingProfile} = useGetMyProfileQuery();
    const [updateProfilePartial, {isLoading: isLoadingUpdate}] = useUpdateProfilePartialMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(myProfile?.description || '');

    if (!myProfile || isLoadingProfile) {
        return <div>Loading profile...</div>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        updateProfilePartial({profileId: myProfile.id, description: editedDescription});
        setIsEditing(false);
    };

    return (
        <CardContent>
            {isEditing ? (
                <TextField
                    fullWidth
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    multiline
                />
            ) : (
                <Typography>{editedDescription}</Typography>
            )}
            {isEditing ? (
                <Button variant="contained" onClick={handleSaveClick} disabled={isLoadingUpdate}>
                    {isLoadingUpdate ? 'Saving...' : 'Save Description'}
                </Button>
            ) : (
                <Button variant="contained" onClick={handleEditClick}>
                    Edit Description
                </Button>
            )}
        </CardContent>
    );
};
