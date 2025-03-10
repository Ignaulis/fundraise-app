import { useContext } from 'react';
import logo from '../assets/logas.svg';
import Link from './Link';
import RouterContext from '../context/Router';
import WrapContext from '../context/Wrap';
import AuthContext from "../context/Auth";
import LogoutButton from './Logout';

export default function Nav() {

    const { page, routes } = useContext(RouterContext);
    const { setFundModal } = useContext(WrapContext);
    const { user } = useContext(AuthContext);

    const handleFundClick = (e) => {
        if (user.role === 'guest') {
            e.preventDefault();
            setFundModal(true);
        }
    }

    if (!routes || !routes[page] || routes[page]?.hideNav) {
        return null;
    };

    return (
        <div className="nav-wrapper">


            <div className="logo">
                <Link to=''>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="nav-full-list">
                {
                    user.role === 'guest'
                        ?
                        <Link to='/' onClick={handleFundClick}>Fundraise</Link>
                        :
                        <Link to='fundraise'>Fundraise</Link>
                }

            </div>
            {
                user.role === 'guest'
                    ?
                    (<div className="nav-login-reg">
                        <Link to='register'>Register</Link>
                        <Link to='login'>Sign In</Link>
                    </div>)
                    :
                    user.role === 'user'
                        ?
                        (<div className="nav-login-reg">
                            <div className="user-name-box">
                                <div>Welcome,</div>
                                <span className='user-name'>{user.name}</span>
                            </div>
                            <LogoutButton />
                        </div>)
                        :
                        (<div className="nav-login-reg">
                            <div className="user-name-box">
                                <div>Welcome,</div>
                                <span className='user-name'>{user.name}</span>
                            </div>
                            <Link to='admin'>Admin</Link>
                            <LogoutButton />
                        </div>)
            }

        </div>
    );
}