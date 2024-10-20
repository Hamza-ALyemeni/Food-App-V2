import { useCallback, useEffect } from "react";

async function sendHttpRequest(url,config) {
   const response = await fetch(url,config);

   const resData = await response.json();

   if(!response.ok){
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
   }

   return resData;
}

export default function useHttp(url,config) {
    const [data , setData] = useState(); 
    const [error , setError] = useState(); 
    const [loading , setLoading] = useState(false); 

    const sendRequest =  useCallback(async function sendRequest() {
        setLoading(true);
        try {
            const resData = sendHttpRequest(url,config);
        } catch (error) {
            setError(error.message || 'Something went wrong !');
        }
        setLoading(false)
    },[url,config]);

    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    } , [sendRequest]);

    return{
        data,
        loading,
        error,
        sendRequest
    }
}