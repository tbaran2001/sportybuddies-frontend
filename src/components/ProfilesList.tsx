import {Link} from "react-router-dom";
import type {Profile} from "../models/profile.ts";

interface ProfilesListProps {
    profiles: Profile[],
}

const ProfilesList = ({profiles}: ProfilesListProps) => {
    if (profiles.length === 0) {
        return <p>No profiles found.</p>
    }

    return (
        <ul>
            {profiles.map(profile => (
                <li key={profile.id}>
                    <Link to={profile.id}>{profile.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export default ProfilesList;

