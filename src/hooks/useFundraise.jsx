import { useState } from "react";
import {serverUrl} from '../constants/main'
import axios from 'axios'

export default function useFundraise() {

    const [success, setSuccess] = useState(false);

    const createStory = async (postData) => {
        setSuccess(false);

        try {
            const response = await axios.post(serverUrl + 'stories', postData);

            if(response.data.success){
                setSuccess(true);
            }
        }
        catch (err){
            console.log(err);
            
        }
    }

    return{createStory}
}