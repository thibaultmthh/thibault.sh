import axios from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';

async function fetcher(...args: any[]) {
  try {
    // @ts-ignore
  const res = await axios.get(...args);
  return res.data

}
  catch (error) {
    console.log(error);
    return error;
  }
}


export default function useVueConter({slug}: {slug: string}){
      const { data } = useSWR(`/api/views/${slug}`, fetcher);
    const views = new Number(data?.views);
    
    useEffect(() => {
        const registerView = () => axios.post(`/api/views/${slug}`)
        registerView();
    }, [slug]);

    return views
}