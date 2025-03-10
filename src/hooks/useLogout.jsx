import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import axios from "axios";
import { serverUrl } from "../constants/main";

export default function useLogout() {

    const [logoutTrigger, setLogoutTrigger] = useState(false);

    const { setUser } = useContext(AuthContext);

    const redirectAfterLogout = () => {
        window.location.hash = '#';
    }

    const triggerLogout = () => {
        setLogoutTrigger(true);
    }

    useEffect(() => {
        if (logoutTrigger) {

            axios.post(serverUrl + 'logout', {}, { withCredentials: true })
                .then(res => {
                    setUser(res.data);
                    redirectAfterLogout();
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLogoutTrigger(false);
                });
        }
    }, [logoutTrigger, setUser]);

    return {triggerLogout};
}
