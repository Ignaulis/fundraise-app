import { useContext } from "react";
import RouterContext from "../context/Router";
import WrapContext from "../context/Wrap";


export default function Card({ post }) {

    const progressbar = post.tikslas === 0 ? 0 : Math.min(1, post.surinkta / post.tikslas);
    const percantage = `${Math.round(progressbar * 100)}%`;

    const {setDonationsModal} = useContext(RouterContext);
    const {setStorieId} = useContext(WrapContext);

    const handleAllDonationsClick = () => {
        setDonationsModal(e => !e);
        setStorieId(post.id)
    }

    const handleClickDonate = () => {
        setStorieId(post.id);
        window.location.hash = '#donate'
    }

    

    return (

        <div className={post.tikslas === post.surinkta ? 'card-wrapper card-finish' : 'card-wrapper'}>
            <div className="card-img-wrap">
                <div className="card-img">
                    <img src={post.img} alt={post.id} />
                </div>
            </div>
            <div className="card-text-wrap">
                <div className="card-text">
                    <p>{post.text}</p>
                </div>
                <div className="card-nums">
                    <div className="card-num">
                    <span>{post.surinkta}</span>
                        <span>{post.tikslas}</span>
                    </div>
                    <div className="prog">
                        <progress value={progressbar} max='1'/>
                        <span>{percantage}</span>
                    </div>
                </div>
                <div className="card-button">
                    <button className="all-don" onClick={handleAllDonationsClick}>All Donations</button>
                    <button className="btn-d" onClick={handleClickDonate}>Donate</button>
                </div>
            </div>
        </div>
    );
}