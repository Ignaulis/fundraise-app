import { useContext } from "react";
import WrapContext from "../../context/Wrap";
import * as M from '../../components/Messages';
import axios from "axios";
import { serverUrl } from "../../constants/main";

export default function Confirm() {

    const { confirm, setConfirm, storieId } = useContext(WrapContext);

    const handleYes = async () => {

        try {
            const response = await axios.delete(`${serverUrl}delete/${storieId}`)

            if (response.data.success) {
                setConfirm(false)
                M.MessagesSuccess('Successfuly deleted!')
                window.location.hash = '#';
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="confirm-wrap" style={confirm ? { display: 'block' } : { display: 'none' }}>
            <div className="confirm-text">
                <span>Are you sure want to delete?</span>
            </div>
            <div className="confirm-btn">
                <button className="yes" onClick={handleYes}>Yes</button>
                <button className="no" onClick={e => setConfirm(!e)}>No</button>
            </div>
        </div>
    );
}