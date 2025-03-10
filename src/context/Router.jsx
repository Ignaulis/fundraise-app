import { createContext, useState, useEffect, useRef, useContext } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Fundraise from "../pages/Fundraise";
import Donate from "../pages/Donate";
import Admin from "../pages/Admin";
import Logout from '../components/Logout';


export const RouterContext = createContext();

export const Router = ({ children }) => {

    const targetRef = useRef(null);
    const [donationsModal, setDonationsModal] = useState(false);



    const routes = {
        '': { c: <Home />, title: 'Home', params: 0 },
        'login': {c: <Login />, title: 'Login', params: 0, hideNav: true},
        'register': {c: <Register />, title: 'Register', params: 0, hideNav: true},
        'fundraise': {c: <Fundraise />, titile: 'Fundraise', params: 0},
        'donate': {c: <Donate />, title: 'Donate', params: 0},
        'admin': {c: <Admin />, title: 'Admin', params: 0},
        'logout': {c: <Logout />, title: 'Logout', params: 0, hideNav: true}
    }

    const [page, setPage] = useState(() => {
        let hash = window.location.hash.replace('#', '');
        hash = hash.split('/').shift();
        return hash || '';
    });

    useEffect(() => {

        window.addEventListener('hashchange', _ => {
            let hash = window.location.hash.replace('#', '');
            hash = hash.split('/');
            setPage(hash.shift());
            
        });

    }, []);



    return (
        <RouterContext.Provider value={{
            page,
            routes,
            targetRef,
            donationsModal,
            setDonationsModal
        }}>
            {children}
        </RouterContext.Provider>
    );
}

export default RouterContext;