import {Button, CardContent, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useUpdateProfilePartialMutation} from "../../store/api.ts";
import type {Profile} from "../../models/profile.ts";

interface ProfileCardCollapseProps {
    profile: Profile;
}

export const ProfileCardCollapse = ({profile}: ProfileCardCollapseProps) => {
    const [updateProfilePartial, {isLoading: isLoadingUpdate}] = useUpdateProfilePartialMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(profile.description || '');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        updateProfilePartial({profileId: profile.id, description: editedDescription});
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
