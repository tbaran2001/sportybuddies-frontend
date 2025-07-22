import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ProfilesPage from "./pages/Profiles.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import ProfileDetail from "./pages/ProfileDetail.tsx";
import {profilesLoader} from "./pages/ProfilesLoader.tsx";

import {profileLoader} from "./components/ProfileLoader.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: '', element: <HomePage/>},
            {
                path: 'profiles', element: <ProfilesPage/>,
                loader: profilesLoader
            },
            {
                path: 'profiles/:profileId', element: <ProfileDetail/>,
                loader: profileLoader,
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
