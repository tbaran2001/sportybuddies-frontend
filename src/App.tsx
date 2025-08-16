import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ProfilesPage from "./pages/Profiles.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EditProfilePage from "./pages/EditProfile.tsx";
import ProfileDetailPage from "./pages/ProfileDetail.tsx";
import AuthenticationPage from "./pages/Authentication.tsx";
import MyProfilePage from "./pages/MyProfile.tsx";
import ProtectedLayout from "./pages/ProtectedLayout.tsx";
import {logoutLoader} from "./pages/Logout.tsx";
import {MatchingPage} from "./pages/Matching.tsx";
import {BuddiesPage} from "./pages/Buddies.tsx";
import {ChatPage} from "./pages/Chat.tsx";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>} errorElement={<ErrorPage/>} id="root">
                <Route index element={<HomePage/>}/>
                <Route path="auth" element={<AuthenticationPage/>}/>
                <Route path="logout" loader={logoutLoader}/>
                <Route path="profiles">
                    <Route index element={<ProfilesPage/>}/>
                    <Route path=":profileId" id="profile-detail">
                        <Route index element={<ProfileDetailPage/>}/>
                    </Route>
                </Route>
                <Route element={<ProtectedLayout/>}>
                    <Route path="profiles/me" element={<MyProfilePage/>}/>
                    <Route path="profiles/:profileId/edit" element={<EditProfilePage/>}/>
                    <Route path="matching" element={<MatchingPage/>}/>
                    <Route path="buddies" element={<BuddiesPage/>}/>
                    <Route path="chat/:conversationId" element={<ChatPage/>}/>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router}/>
    );
}

export default App;