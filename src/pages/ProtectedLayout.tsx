import {Navigate, Outlet} from "react-router-dom";
import {getAuthToken} from "../utils/auth.ts";

const ProtectedLayout = () => {
    const token = getAuthToken();

    if (!token) {
        return <Navigate to="/auth"/>;
    }

    return <Outlet/>;
};

export default ProtectedLayout;