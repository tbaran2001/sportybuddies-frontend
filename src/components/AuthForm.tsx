import {useState, type FormEvent} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../store/api.ts";
import {setToken} from "../store/authSlice.ts";

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userData = await login(email).unwrap();

            dispatch(setToken({token: userData}));
            setEmail('');

            const from = location.state?.from?.pathname || '/profiles/me';
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Failed to log in:', err);
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
                </p>
                <div>
                    <button disabled={isLoading}>
                        Login
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;