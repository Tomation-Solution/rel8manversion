import axios from "../helpers/axios";
import { PropsPectiveFormOneType, PropsPectiveFormTwoType } from "../pages/prospective/home";




export const submitProspectiveMemberFormOneApi = async (data:PropsPectiveFormOneType)=>{
   
    const resp = await axios.post('/tenant/prospectivemember/general_propective_member_manage_form_one/',data)
    return resp.data
}

type getFormoneDataResponse ={
    "id": number,
    "info": {'name':string,'value':string}[],
    "prospective_member": number;
}
export const getFormoneDataApi = async ():Promise<getFormoneDataResponse>=>{

    const resp = await axios.get('/tenant/prospectivemember/general_propective_member_manage_form_one/get_data/')
    console.log({'dd':resp.data?.data})
    return resp.data?.data
}

export const createForm2Api = async ({data}:PropsPectiveFormTwoType)=>{

    const form = new FormData()
    for(let  obj of data){
        form.append(obj.name,obj.file)
    }
    console.log({'Submitted':data})
    const resp = await axios.post('/tenant/prospectivemember/general_propective_member_manage_form_two/',form)
    console.log({'resp':resp})
    return resp.data

}

type getStatusApiType = {
    "id": number,
    "files": {id?:number,name:string,file:any|string}[],
    "prospective_member": number
}
export const gettForm2Api =async ():Promise<getStatusApiType>=>{
    const resp = await axios.get('/tenant/prospectivemember/general_propective_member_manage_form_two/',)
    return resp.data.data
}
type getStatusResponse = {
    "status": string;
}
export const getStatusApi = async():Promise<getStatusResponse>=>{
    const resp = await axios.get('/tenant/prospectivemember/general_propective_member_manage_form_two/')
    return resp.data.data
}
export const deleteAFileFromForm2Api = async(id:number)=>{
    const form = new FormData()
    form.append('id',id.toString())
    const resp = await axios.post('/tenant/prospectivemember/general_propective_member_manage_form_two/delete_file/',form)
    return resp.data
}

type getAdminRulesType = {
    "amount": number,
    "text_fields":string[]
    "file_fields": string[];
}
export const get_admin_rules = async():Promise<getAdminRulesType>=>{
    const resp = await axios.get('/tenant/prospectivemember/general_propective_member_manage_form_one/get_admin_rules/')
    return resp.data.data
}