import { useEffect, useState } from "react";


export const useFetch = (endPoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(endPoint)
        .then((res) => res.json())
        .then((fetchedData) => setData(fetchedData))
        .catch((err) => console.error(err));
    }, [endPoint]);

    return data; 
};