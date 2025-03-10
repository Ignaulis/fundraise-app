import React, { useState } from "react";
import useRegister from '../hooks/useRegister';
import reg from '../assets/reg.svg';
import * as M from '../components/Messages';

export default function Register() {
    const {
        register,
        handleInputChange,
        handleRegistration
    } = useRegister();

    

    const [check, setCheck] = useState(false);

    const handleCheck = () => {
        setCheck(prev => !prev);
    };

    const goHome = () => {
        window.location.hash = '#';
    };

    return (
        <div className="reg-wrap">
            <div className="reg-image">
                <img src={reg} alt="register" />
            </div>
            <div className="reg-con">
                <div className="reg-input">
                    <div className="reg-in">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" value={register.name || ''} onChange={handleInputChange} />
                    </div>
                    <div className="reg-in">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={register.email || ''} onChange={handleInputChange} />
                    </div>
                    <div className="reg-in">
                        <label htmlFor="password">Password</label>
                        <input type={check ? 'text' : 'password'} id="password" value={register.password || ''} onChange={handleInputChange} />
                    </div>
                    <div className="reg-in">
                        <label htmlFor="password2">Repeat Password</label>
                        <input type={check ? 'text' : 'password'} id="password2" value={register.password2 || ''} onChange={handleInputChange} />
                        <div className="reg-check">
                            <input type="checkbox" id="check" checked={check} onChange={handleCheck} />
                            <label htmlFor="check">Show Password</label>
                        </div>
                    </div>
                </div>
                <div className="reg-btns">
                    <button className="reg-login" onClick={handleRegistration}>Register</button>
                    <button className="reg-cancel" onClick={goHome}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
