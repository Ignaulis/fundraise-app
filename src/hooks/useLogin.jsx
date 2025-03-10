import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import axios from "axios";
import { serverUrl } from "../constants/main";
import * as M from '../components/Messages';

export default function useLogin() {

    const redirectToMain = () => {
        window.location.hash = '#';
    };

    const [loginData, setLoginData] = useState(null);

    const {setUser} = useContext(AuthContext);

    useEffect(() => {

        if(null == loginData){
            return;
        }

        axios.post(serverUrl + 'login', loginData, {withCredentials: true})
            .then(res => {
                setUser(res.data.user);
                redirectToMain();
                M.MessagesSuccess(`Hello, ${res.data.user.name}!`)
            })
            .catch(err => {
                console.error('Login failed:', err.response?.data?.message || err.message);
                M.MessagesError('Incorrect email or password!');
                setLoginData(null);
                
            })

    }, [loginData])

    return {setLoginData, loginData};
}