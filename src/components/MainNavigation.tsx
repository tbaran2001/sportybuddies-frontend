import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

const MainNavigation = () => {
    const token = useRouteLoaderData('root');

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
                                <Form action='/logout' method={'post'}>
                                    <button>Logout</button>
                                </Form>
                            </li>
                        </>
                    )}

                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;