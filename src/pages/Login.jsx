import { useState } from 'react';
import logo from '../assets/log.svg';
import * as M from '../components/Messages';
import useLogin from '../hooks/useLogin';


export default function Login() {

    const [check, setCheck] = useState(false);
    const {setLoginData} = useLogin();

    const [form, setForm] = useState({
        email: '',
        passw: ''
    });

    const handleChange = e => {
        setForm(f => ({
            ...f,
            [e.target.id]: e.target.value
        }))
    }


    const handleConfirm = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(form.email)) {
            M.MessagesError('Please enter a valid email!');
            return;
        }
    
        if (form.passw === '') {
            M.MessagesError('Please enter a valid password!');
            return;
        }

        setLoginData(form);

    }
    

    const handleCheck = () => {
        setCheck(prev => !prev);
    };

    const goHome = () => {
        window.location.hash = '#'
    };




    return (
        <div className="login-wrap">
            <div className="login-con">
                <div className="login-input">
                    <div className="login-in">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="login-in">
                        <label htmlFor="passw">Password</label>
                        <input type={check ? 'text' : 'password'} id='passw' value={form.passw} onChange={handleChange} />
                        <div className="login-check">
                            <input type="checkbox" id='check' value={check} onChange={() => handleCheck()} />
                            <label htmlFor="check">Show Password</label>
                        </div>
                    </div>
                </div>
                <div className="login-btns">
                    <button className="login-login" onClick={handleConfirm}>Sign In</button>
                    <button className="login-cancel" onClick={() => goHome()}>Cancel</button>
                </div>
            </div>
            <div className="login-image">
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
}