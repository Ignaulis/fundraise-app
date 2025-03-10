import { useContext } from "react";
import useLogout from "../hooks/useLogout";
import Link from './Link';
import * as M from './Messages';
import AuthContext from "../context/Auth";

const LogoutButton = () => {
    const { triggerLogout } = useLogout();
    const {user} = useContext(AuthContext);


    const handleLogout = (e) => {
        e.preventDefault();
        triggerLogout();
        M.MessagesSuccess(`Goodbye, ${user.name}!`)
    };

    return (
        <Link to="#" onClick={handleLogout} className="logout-btn">
            Sign Out
        </Link>
    );
};

export default LogoutButton;
