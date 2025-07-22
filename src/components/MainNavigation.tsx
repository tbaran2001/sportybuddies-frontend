import {NavLink} from "react-router-dom";

const MainNavigation = () => {

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
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;