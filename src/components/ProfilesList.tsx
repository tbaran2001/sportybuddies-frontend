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
        <div>
            <h2>All profiles:</h2>
            <ul>
                {profiles.map(profile => (
                    <li key={profile.id}>
                        <Link to={profile.id}>{profile.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfilesList;

