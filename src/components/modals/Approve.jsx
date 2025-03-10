import { useContext } from "react";
import WrapContext from "../../context/Wrap";
import * as M from "../Messages";
import axios from "axios";
import { serverUrl } from "../../constants/main";

export default function Approve() {

    const { approve, setApprove, storieId } = useContext(WrapContext);

    const handleYes = async () => {

        try {
            const response = await axios.put(`${serverUrl}approve/${storieId}`, {
                status: 'patvirtinta'
            })
            if (response.data && response.data.success) {
                M.MessagesSuccess('Successfuly approved!');
                setApprove(false);
                window.location.hash = '#';
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="confirm-wrap" style={approve ? { display: 'block' } : { display: 'none' }}>
            <div className="confirm-text">
                <span>Are you sure want to approve?</span>
            </div>
            <div className="confirm-btn">
                <button className="yes" onClick={handleYes}>Yes</button>
                <button className="no" onClick={e => setApprove(!e)}>No</button>
            </div>
        </div>
    );
}