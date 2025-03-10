import { useContext } from "react"
import WrapContext from "../../context/Wrap"

export default function FundSign() {

    const {fundModal, setFundModal} = useContext(WrapContext);


    const locateLog = () => {
        window.location.hash = '#register';
        setFundModal(false);
    }
    const locateSig = () => {
        window.location.hash = '#login'
        setFundModal(false);
    }


    return(
        <div className="fund-modal" style={fundModal ? {display: 'block'} : {display: 'none'}}>
            <div className="fund-modal-text">
                <span>You Have To Sign In</span>
            </div>
            <div className="fund-modal-buttons">
                <button className="btn-s" onClick={locateSig}>Sign In</button>
                <button className="btn-r" onClick={locateLog}>Register</button>
                <button className="btn-c" onClick={(e) => setFundModal(!e)}>Cancel</button>
            </div>
        </div>
    );
}