import type {Profile} from "../models/profile.ts";
import {Link} from "react-router-dom";

interface ProfileItemProps {
    profile: Profile,
}

const ProfileItem = ({profile}: ProfileItemProps) => {
    return (
        <article>
            <h2>{profile.name}</h2>
            <p>Description: {profile.description || "no description"}</p>
            <p>Date of birth: {profile.dateOfBirth}</p>
            <p>gender: {profile.gender}</p>
            <menu>
                <Link to='edit'>Edit</Link>
                <button>
                    Delete
                </button>
            </menu>
        </article>
    )
}

export default ProfileItem;