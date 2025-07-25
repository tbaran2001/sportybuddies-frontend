import {useLoaderData} from "react-router-dom";
import type {Profile, Sport} from "../models/profile.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {addProfileSports, getSports, removeProfileSports} from "../api.ts";
import {receivedSports} from "../store/sportsSlice.ts";
import {addSportToMyProfile, receivedMyProfile, removeSportFromMyProfile} from "../store/myProfileSlice.ts";

const MyProfilePage = () => {
    const initialProfile = useLoaderData() as Profile;
    const profile = useAppSelector(state => state.myProfile.myProfile);
    const sports = useAppSelector(state => state.sports.sports);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(receivedMyProfile(initialProfile));
    }, [initialProfile, dispatch]);

    useEffect(() => {
        const fetchSports = async () => {
            const sports = await getSports();
            dispatch(receivedSports(sports));
        };
        fetchSports();
    }, [dispatch]);

    const handleSportToggle = async (sport: Sport) => {
        if (!profile) return;

        const hasSport = profile.sports.some(s => s.id === sport.id);

        try {
            if (hasSport) {
                await removeProfileSports(profile.id, sport.id);
                dispatch(removeSportFromMyProfile(sport.id));
            } else {
                await addProfileSports(profile.id, sport.id);
                dispatch(addSportToMyProfile(sport));
            }
        } catch (error) {
            console.error("Failed to update profile sports:", error);
        }
    };

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    const profileSportIds = new Set(profile.sports.map(s => s.id));

    return (
        <div>
            <h1>My Profile</h1>
            <p>I am {profile.name} with id: {profile.id}</p>
            <h1>My sports:</h1>
            {profile.sports.map(sport => (
                <div key={sport.id}>
                    <h2>{sport.name}</h2>
                    <p>{sport.description}</p>
                </div>
            ))}
            <h1>All sports:</h1>
            {sports.map(sport => (
                <div key={sport.id}>
                    <h2>{sport.name}</h2>
                    <p>{sport.description}</p>
                    <button onClick={() => handleSportToggle(sport)}>
                        {profileSportIds.has(sport.id) ? 'Remove' : 'Add'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MyProfilePage;