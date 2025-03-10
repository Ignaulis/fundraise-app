import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { serverUrl } from '../constants/main';
import RouterContext from '../context/Router';

export default function usePosts() {

    const {page} = useContext(RouterContext);

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        axios.get(serverUrl + 'fond')
            .then(res => {
                setPosts(res.data);
                
            })
            .catch(err => {
                console.log(err);
            })
    },[page])

    return({posts});
}