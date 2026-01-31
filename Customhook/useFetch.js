import {useEffect, useState} from 'react'
import axios from 'axios'



function useFetch (url, refresh) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [foods, setFoods] = useState([]);
    
    useEffect(()=>{
        const fetchApi = async () => {
            try{
                const res = await axios.get(url);
                
                setFoods(res.data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchApi();
    },[url, refresh]);

    return {loading, error, foods};
}

export default useFetch