import { useContext, useState } from "react";
import * as M from '../components/Messages'
import AuthContext from "../context/Auth";
import WrapContext from "../context/Wrap";
import axios from "axios";
import { serverUrl } from "../constants/main";
import useDonations from "../hooks/useDonations";
import usePosts from "../hooks/usePosts";



export default function Donate() {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);

    const { user } = useContext(AuthContext);
    const { storieId } = useContext(WrapContext);
    const { donations } = useDonations(storieId);
    const { posts } = usePosts();

    let totalSum = 0;
    const totalDonations = donations.filter(d => d.id === storieId).forEach(don => totalSum += don.sum);
    const targetToDonate = posts.filter(p => p.id === storieId).map(t => t.tikslas);
    const maxSumToDonate = targetToDonate - totalSum;

    const handleAmountChange = (value) => {
        setAmount(value);
    }
    const handleConfirm = async () => {
        if (name === '') {
            M.MessagesError('Please enter valid name!')
            return;
        }
        if (amount < 0) {
            M.MessagesError('Please enter valid amount!');
            return;
        }
        if (amount > maxSumToDonate) {
            M.MessagesError(`Maximum to donate to this fundraise ${maxSumToDonate}`)
            return;
        }

        const donateInfo = {
            name,
            amount,
            storieId
        }

        try {
            const response = await axios.put(serverUrl + 'donate', donateInfo)

            if (response.data.success) {
                M.MessagesSuccess('Thank you for donation!');
                window.location.hash = '#';
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleCancel = () => {
        window.location.hash = '#';
    }

    return (
        <div className="donate-wrap">
            <div className="donate-con">
                <div className="donation-name">
                    <label htmlFor="fullname">Enter Your Full Name</label>
                    <input type="text" id="fullname" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="donation-input">
                    <label htmlFor="amount">Enter Donate Amount</label>
                    <input type="number" id="amount" min={1} max={10000} value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="donation-suges">
                    <button onClick={() => handleAmountChange(10)}>$10</button>
                    <button onClick={() => handleAmountChange(50)}>$50</button>
                    <button onClick={() => handleAmountChange(100)}>$100</button>
                    <button onClick={() => handleAmountChange(500)}>$500</button>
                </div>
                <div className="donation-btn">
                    <button className="don-don" onClick={handleConfirm}>Donate</button>
                    <button className="don-can" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}