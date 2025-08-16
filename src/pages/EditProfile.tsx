import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as React from "react";
import {useUpdateProfileMutation, useGetProfileQuery} from "../store/api.ts";

const EditProfilePage = () => {
    const { profileId } = useParams<{ profileId: string }>();
    const navigate = useNavigate();
    const { data: profile, isLoading: isProfileLoading, error: profileError } = useGetProfileQuery(profileId!);
    const [updateProfile, {isLoading, error}] = useUpdateProfileMutation();

    const [formData, setFormData] = useState({
        name: profile?.name || '',
        description: profile?.description ?? '',
        gender: profile?.gender || 0,
        dateOfBirth: profile ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                description: profile.description ?? '',
                gender: profile.gender,
                dateOfBirth: new Date(profile.dateOfBirth).toISOString().split('T')[0],
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!profile) return;

        try {
            await updateProfile({
                profileId: profile.id,
                name: formData.name,
                description: formData.description,
                gender: Number(formData.gender),
                dateOfBirth: formData.dateOfBirth,
            }).unwrap();

            navigate(`/profiles/${profile.id}`);
        } catch (err) {
            console.error('Failed to update MyProfile:', err);
        }
    };

    if (isProfileLoading) {
        return <div>Loading profile...</div>;
    }

    if (profileError) {
        return <div>Error loading profile. Please try again.</div>;
    }

    if (!profile) {
        return <div>Profile not found.</div>;
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            {!!error && (
                <div style={{color: 'red', marginBottom: '1rem'}}>
                    Error updating profile. Please try again.
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value={0}>Unknown</option>
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default EditProfilePage;