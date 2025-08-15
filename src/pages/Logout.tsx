import {redirect} from "react-router-dom";
import {store} from "../store/store";
import {logOut} from "../store/authSlice";

export function logoutLoader() {
    store.dispatch(logOut());

    return redirect('/');
}