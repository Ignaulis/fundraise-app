import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import AuthContext from "./Auth";
import RouterContext from "./Router";

export const WrapContext = createContext();

export const Wrap = ({children}) => {

    const [fundModal, setFundModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [approve, setApprove] = useState(false);
    const [storieId, setStorieId] = useState(null);
    const {user} = useContext(AuthContext);
    const {page} = useContext(RouterContext);


        useEffect(() => {
            if((user?.role === 'guest' || user?.role === 'user') && page === 'admin'){
                window.location.hash = '#'
            }
            if(user?.role === 'guest' && page === 'fundraise'){
                window.location.hash = '#'
            }
        }, [user, page])


    return(
        <WrapContext.Provider value={{
            fundModal,
            setFundModal,
            confirm,
            setConfirm,
            approve,
            setApprove,
            storieId,
            setStorieId
        }}>{children}</WrapContext.Provider>
    );
};

export default WrapContext;