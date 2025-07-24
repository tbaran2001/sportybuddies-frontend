import {Form, useRouteLoaderData} from "react-router-dom";
import type {Profile} from "../models/profile.ts";
import {useState} from "react";
import * as React from "react";

const EditProfilePage = () => {
    const profile = useRouteLoaderData('profile-detail') as Profile;

    const [formData, setFormData] = useState({
        name: profile.name,
        description: profile.description ?? '',
        gender: profile.gender,
        dateOfBirth: new Date(profile.dateOfBirth).toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            <Form method='post'>
                <div>
                    <input
                        type="hidden"
                        name="profileId"
                        value={profile.id}
                    />
                </div>
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
                <button type="submit">Save Changes</button>
            </Form>
        </div>
    );
}

export default EditProfilePage;