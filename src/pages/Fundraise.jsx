import { useContext, useState} from "react";
import * as M from '../components/Messages';
import useFundraise from "../hooks/useFundraise";
import AuthContext from "../context/Auth";

export default function Fundraise() {

    const {createStory} = useFundraise()
    const {user} = useContext(AuthContext);

    const [tikslas, settikslas] = useState(100);
    const [text, setText] = useState('');
    const [img, setImg] = useState('');
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        window.location.hash = '#';
    }

    const handleConfirm = () => {
        const regax = /^(100|[1-9][0-9]{2,3}|10000)$/;
        if (text === '') {
            M.MessagesError('Please enter text!');
            return;
        }
        if (!regax.test(tikslas)) {
            M.MessagesError('Please enter valid amount!');
            return;
        }
        if (img === '') {
            M.MessagesError('Please upload image!');
            return;
        }

        const postData = {
            text,
            tikslas, 
            img,
            user_id: user.id,
            status: 'nepatvirtinta'
        };

        createStory(postData);
        M.MessagesSuccess('Submission received. Wait for approval.');
        handleCancel();
    }

    return (

        <div className="fundraise-wrap">
            <div className="fund-con">
                <div className="fundraise-inputs">
                    <label htmlFor="target">Tell a Story</label>
                    <textarea className="story-f" id="target" value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className="fundraise-inputs">
                    <label htmlFor="target">Target</label>
                    <span>Minimum $100 maximum $10.000</span>
                    <input type="number" id="target" min={100} max={10000} value={tikslas} onChange={e => settikslas(e.target.value)} />
                </div>

                <div className="fundraise-inputs">
                    <label htmlFor="image">Upload Image</label>
                    <input className="image-f" type="file" id="image" onChange={handleImageUpload} />
                </div>
                <div className="fundraise-btn">
                    <button className="fun-sub" onClick={handleConfirm}>Submit</button>
                    <button className="fun-can" onClick={() => handleCancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}