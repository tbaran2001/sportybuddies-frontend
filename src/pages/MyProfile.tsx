import type {Sport} from "../models/profile.ts";
import {
    useAddProfileSportMutation,
    useGetMyProfileQuery,
    useGetSportsQuery,
    useRemoveProfileSportMutation
} from "../store/api.ts";

const MyProfilePage = () => {
    const {data: profile, isLoading, isError, error} = useGetMyProfileQuery();
    const {data: sports = []} = useGetSportsQuery();
    const [addProfileSport] = useAddProfileSportMutation();
    const [removeProfileSport] = useRemoveProfileSportMutation();

    const handleSportToggle = async (sport: Sport) => {
        if (!profile) return;

        const hasSport = profile.sports.some(s => s.id === sport.id);
        const args = {profileId: profile.id, sportId: sport.id};

        try {
            if (hasSport) {
                await removeProfileSport(args).unwrap();
            } else {
                await addProfileSport(args).unwrap();
            }
        } catch (err) {
            console.error("Failed to update profile sports:", err);
        }
    };

    if (isLoading || !profile) {
        return <div>Loading profile...</div>;
    }

    if (isError) {
        return <div><h3>Error loading profile.</h3><p>{JSON.stringify(error)}</p></div>;
    }

    const profileSportIds = new Set(profile.sports.map(s => s.id));

    return (
        <div>
            <h1>My Profile</h1>
            <p>I am {profile.name} with id: {profile.id}</p>
            <h1>My sports ({profile.sports.length}):</h1>
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