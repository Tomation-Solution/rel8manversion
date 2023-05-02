import axios from "../helpers/axios"

export const dynamicPaymentApi = async ({payment_id,payment_type}:{payment_id:number,payment_type:string}):Promise<any>=>{

    const resp = await axios.post(`/tenant/dues/process_payment/${payment_type}/${payment_id}/`)
    window.location.href=resp.data.data.data.authorization_url

    return resp.data.data
}