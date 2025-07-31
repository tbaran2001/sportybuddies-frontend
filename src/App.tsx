import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ProfilesPage from "./pages/Profiles.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EditProfilePage from "./pages/EditProfile.tsx";
import ProfileDetailPage from "./pages/ProfileDetail.tsx";
import AuthenticationPage from "./pages/Authentication.tsx";
import {getTokenAction} from "./react-router-things/authActions.ts";
import MyProfilePage from "./pages/MyProfile.tsx";
import {logoutAction} from "./pages/Logout.tsx";
import {tokenLoader} from "./utils/auth.ts";
import ProtectedLayout from "./pages/ProtectedLayout.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        id: 'root',
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'auth',
                element: <AuthenticationPage/>,
                action: getTokenAction,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
            {
                path: 'profiles',
                children: [
                    {
                        index: true,
                        element: <ProfilesPage/>,
                    },
                    {
                        path: ':profileId',
                        id: 'profile-detail',
                        children: [
                            {
                                index: true,
                                element: <ProfileDetailPage/>,
                            },
                        ]
                    },
                ]
            },
            {
                element: <ProtectedLayout/>,
                children: [
                    {
                        path: 'profiles/me',
                        element: <MyProfilePage/>,
                    },
                    {
                        path: 'profiles/:profileId/edit',
                        element: <EditProfilePage/>,
                    }
                ]
            }
        ]
    },
])

function App() {

    return (
        <RouterProvider router={router}/>
    )
}

export default App
