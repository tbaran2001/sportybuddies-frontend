import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ProfilesPage from "./pages/Profiles.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EditProfilePage from "./pages/EditProfile.tsx";
import ProfileDetailPage from "./pages/ProfileDetail.tsx";
import {myProfileLoader, profileLoader, profilesLoader} from "./react-router-things/profileLoaders.ts";
import {editProfileAction} from "./react-router-things/profileActions.ts";
import AuthenticationPage from "./pages/Authentication.tsx";
import {getTokenAction} from "./react-router-things/authActions.ts";
import MyProfilePage from "./pages/MyProfile.tsx";
import {logoutAction} from "./pages/Logout.tsx";
import {checkAuthTokenLoader, tokenLoader} from "./utils/auth.ts";


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
                        loader: profilesLoader,
                    },
                    {
                        path: 'me',
                        element: <MyProfilePage/>,
                        loader: myProfileLoader,
                    },
                    {
                        path: ':profileId',
                        id: 'profile-detail',
                        loader: profileLoader,
                        children: [
                            {
                                index: true,
                                element: <ProfileDetailPage/>,
                            },
                            {
                                path: 'edit',
                                element: <EditProfilePage/>,
                                action: editProfileAction,
                                loader: checkAuthTokenLoader,
                            }
                        ]
                    },
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
