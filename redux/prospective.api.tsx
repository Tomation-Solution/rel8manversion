import axios from "../helpers/axios";
import { PropsPectiveFormOneType, PropsPectiveFormTwoType } from "../pages/prospective/home";




export const submitProspectiveMemberFormOneApi = async (data:PropsPectiveFormOneType)=>{
    const submitdata:any = {
        'data':[
            {name:'full_name','value':data.full_name},
            {name:'address','value':data.address},
            {name:'mobile','value':data.mobile},
        ]
    }
    const resp = await axios.post('/tenant/prospectivemember/general_propective_member_manage_form_one/',submitdata)
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

export const createForm2Api = async (data:PropsPectiveFormTwoType)=>{

    const form = new FormData()
    form.append('certificate',data.certificate)
    form.append('dob',data.dob)

    const resp = await axios.post('/tenant/prospectivemember/general_propective_member_manage_form_two/',form)
    return resp.data

}
type getStatusResponse = {
    "status": string;
}
export const getStatusApi = async():Promise<getStatusResponse>=>{
    const resp = await axios.get('/tenant/prospectivemember/general_propective_member_manage_form_two/get_status/')
    return resp.data.data
}