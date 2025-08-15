import {redirect} from "react-router-dom";
import {store} from "../store/store";
import {logOut} from "../store/authSlice";
import {api} from "../store/api";

export function logoutLoader() {
    store.dispatch(logOut());
    store.dispatch(api.util.resetApiState());

    return redirect('/');
}