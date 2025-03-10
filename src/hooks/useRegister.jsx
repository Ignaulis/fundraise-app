import { useState } from "react";
import axios from 'axios';
import { serverUrl } from "../constants/main";
import * as M from '../components/Messages';


export default function useRegister() {
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleInputChange = e => {
        const { id, value } = e.target;
        setRegister(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleRegistration = async () => {
        const { name, email, password, password2 } = register;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password || !password2) {
            M.MessagesError("Please fill in all fields.");
            return;
        }

        if (password !== password2) {
            M.MessagesError("Passwords do not match.");
            return;
        }

        if (!emailRegex.test(email)) {
            M.MessagesError('Please enter a valid email!');
            return;
        }

        try {
            const response = await axios.post(serverUrl + "register", {
                name,
                email,
                passw: password,
                password2
            });

            setRegister(response.data);
            M.MessagesSuccess('You can now sign in!')
            window.location.hash = '#login';
        } catch (err) {
            M.MessagesError("Email already exists!.");
            console.error(err);
        }
    };

    return {
        register,
        handleInputChange,
        handleRegistration
    };
}
