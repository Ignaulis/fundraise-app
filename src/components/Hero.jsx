import hero from '../assets/hero.svg';
import RouterContext from '../context/Router';
import { useContext } from 'react';


export default function Hero() {

    const {targetRef} = useContext(RouterContext);

    const scrollSec = () => {
        targetRef.current.scrollIntoView({behavior: 'smooth'});
    }

    return(
        <div className="hero-wrapper">
            <div className="hero-text">
                <div className="hero-text-container">
                    <p>Your home for help</p>
                    <a className='nav-btn' onClick={scrollSec}>Donate</a>
                </div>
            </div>
            <div className="hero-image">
                <img src={hero} alt="hero" />
            </div>
        </div>
    );
}