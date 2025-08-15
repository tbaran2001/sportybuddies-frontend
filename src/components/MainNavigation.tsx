import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../store/authSlice";

const MainNavigation = () => {
    const token = useSelector(selectCurrentToken);

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({isActive}) => isActive ? 'active' : undefined} end>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profiles' className={({isActive}) => isActive ? 'active' : undefined}>
                            Profiles
                        </NavLink>
                    </li>
                    {!token && (
                        <li>
                            <NavLink to='/auth' className={({isActive}) => isActive ? 'active' : undefined}>
                                Authentication
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <>
                            <li>
                                <NavLink to='/profiles/me' className={({isActive}) => isActive ? 'active' : undefined}>
                                    My profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/matching' className={({isActive}) => isActive ? 'active' : undefined}>
                                    Matching
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/buddies' className={({isActive}) => isActive ? 'active' : undefined}>
                                    Buddies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/chat' className={({isActive}) => isActive ? 'active' : undefined}>
                                    Chat
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/logout' className={({isActive}) => isActive ? 'active' : undefined}>
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}

                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;