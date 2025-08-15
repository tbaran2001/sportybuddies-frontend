import {Navigate, Outlet, useLocation} from "react-router-dom";
import {selectCurrentToken} from "../store/authSlice.ts";
import {useSelector} from "react-redux";

const ProtectedLayout = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />
    }

    return <Outlet/>;
};

export default ProtectedLayout;