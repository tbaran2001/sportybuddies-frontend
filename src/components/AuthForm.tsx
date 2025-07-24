import {Form} from "react-router-dom";

const AuthForm = () => {
    return (
        <>
            <Form method="post">
                <h1>Login</h1>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <div >
                    <button >
                        Login
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;