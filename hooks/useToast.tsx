import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'



const useToast = ()=>{
    const notify = (msg:string,type?:'error'|'success') => type=='success'?toast.success(msg):toast.error(msg);

    // useEffect(()=>{
    //     notify()
    // },[])

    return {notify}
}


export default useToast 