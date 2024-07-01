import {useEffect, useState} from "react";
import axios from "axios";

const useFetch = (https://gebookin.onrender.com/hotels/countByCity?cities=Jakarta,Bandung,Bogor,Depok,Bekasi) =>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            try{

                const res = await axios.get(https://gebookin.onrender.com/hotels/countByCity?cities=Jakarta,Bandung,Bogor,Depok,Bekasi);
                setData(res.data);
            }catch (err) {
                setError(err);
            }
            setLoading(false)
        };
        fetchData();
    }, []);

    const reFetch = async ()=>{
        setLoading(true)
        try{

            const res = await axios.get(https://gebookin.onrender.com/hotels/countByCity?cities=Jakarta,Bandung,Bogor,Depok,Bekasi);
            setData(res.data);
        }catch (err) {
            setError(err);
        }
        setLoading(false)
    };

    return {data,loading,error,reFetch};
};

export default useFetch;
