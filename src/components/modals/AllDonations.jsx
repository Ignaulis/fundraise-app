import { useContext } from "react";
import RouterContext from "../../context/Router";
import useDonations from "../../hooks/useDonations";
import WrapContext from "../../context/Wrap";

export default function AllDonations() {

    const {donationsModal, setDonationsModal} = useContext(RouterContext);
    const {storieId} = useContext(WrapContext);
    const {donations} = useDonations(storieId);
    
    

    return (
        <div className="all-donations" style={donationsModal ? {display: 'flex'} : {display: 'none'}}>
            <div className="donations-card">
                {donations.length > 0 ? (
                donations.map((donation, index) => (
                <div key={index} className="donator">
                    <div className="donator-info">
                        <span>Full name</span>
                        <p>{donation.name}</p>
                    </div>
                    <div className="donator-info">
                        <span>Amount</span>
                        <p>{donation.sum}</p>
                    </div>
                </div>))) : 
                <span>No donations</span>}
                <div className="donations-btn">
                    <button onClick={() => setDonationsModal(e => !e)}>Close</button>
                </div>
            </div>
        </div>
    );
}