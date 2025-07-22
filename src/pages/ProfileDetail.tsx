import {useParams} from "react-router-dom";

const ProfileDetailPage = () => {
    const params = useParams<{ profileId: string }>();

    return (
        <div>
            <h1>Profile Detail Page</h1>
            <p>This is the profile detail page. for {params.profileId}</p>
        </div>
    );
}

export default ProfileDetailPage;