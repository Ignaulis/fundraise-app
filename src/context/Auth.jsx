import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../constants/main";

const AuthContext = createContext();

export const Auth = ({children}) => {

    const [user, setUser] = useState(null);
    

    useEffect(() => {
        axios.get(serverUrl + 'auth', {withCredentials: true})
            .then(res => {
                setUser(res.data);
                
            })
            .catch(err => {
                console.log(err);
            })
        

    },[])
    

    return (
        <AuthContext.Provider value={{
            user, setUser
        }}>
            {user === null ? <h2>Logging in...</h2> : children}
        </AuthContext.Provider>
    );
}

export default AuthContext;