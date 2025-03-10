import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverUrl } from '../constants/main';

export default function useDonations(storieId) {


    const [donations, setDonations] = useState([]);


    useEffect(() => {
        if(storieId) {

        axios.get(`${serverUrl}donations?storie_id=${storieId}`)
            .then(res => {
                setDonations(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[storieId])

    return({donations});
}