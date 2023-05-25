import axios from "../helpers/axios"

export const dynamicPaymentApi = async ({payment_id,payment_type,setIsloading,query_param=''}:{payment_id:number,payment_type:string,setIsloading?:any,query_param?:string}):Promise<any>=>{
    try{
        if(setIsloading){
            setIsloading(true)
     
        }
         const resp = await axios.post(`/tenant/dues/process_payment/${payment_type}/${payment_id}/${query_param}`)
        
         window.location.href=resp.data.data.data.authorization_url
     
         return resp.data.data
    }
    catch(e:any){
        if(setIsloading){
            setIsloading(false)
        }
       
    }
}