import ProfilesList from "../components/ProfilesList.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {getProfiles} from "../api.ts";
import {useEffect} from "react";
import {receivedProfiles} from "../store/profilesSlice.ts";

const ProfilesPage = () => {
    const profiles = useAppSelector(state => state.profiles.profiles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProfiles = async () => {
            const profiles = await getProfiles();
            dispatch(receivedProfiles(profiles));
        };
        fetchProfiles();
    }, [dispatch]);

    return (
        <div>
            <h1>Profiles page</h1>
            <ProfilesList profiles={profiles}/>
        </div>
    )
}

export default ProfilesPage;

