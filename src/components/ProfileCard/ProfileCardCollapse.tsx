import {Button, CardContent, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useUpdateProfilePartialMutation} from "../../store/api.ts";
import type {Profile} from "../../models/profile.ts";

interface ProfileCardCollapseProps {
    profile: Profile;
    readOnly?: boolean;
}

export const ProfileCardCollapse = ({profile, readOnly = false}: ProfileCardCollapseProps) => {
    const [updateProfilePartial, {isLoading: isLoadingUpdate}] = useUpdateProfilePartialMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(profile.description || '');

    const handleEditClick = () => {
        if (!readOnly) {
            setIsEditing(true);
        }
    };

    const handleSaveClick = async () => {
        if (!readOnly) {
            updateProfilePartial({profileId: profile.id, description: editedDescription});
            setIsEditing(false);
        }
    };

    return (
        <CardContent>
            {isEditing && !readOnly ? (
                <TextField
                    fullWidth
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    multiline
                />
            ) : (
                <Typography>{profile.description || editedDescription}</Typography>
            )}
            {!readOnly && (
                isEditing ? (
                    <Button variant="contained" onClick={handleSaveClick} disabled={isLoadingUpdate}>
                        {isLoadingUpdate ? 'Saving...' : 'Save Description'}
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleEditClick}>
                        Edit Description
                    </Button>
                )
            )}
        </CardContent>
    );
};
