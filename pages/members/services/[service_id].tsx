import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import Table from "../../../components/Table/Table"
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import { getAllSubmissionOfAService, getServiceDetail } from "../../../redux/customServiceRequestApi"
import Spinner from "../../../components/Spinner"
import CustomBtn from "../../../components/CustomBtn/Button"


const CustomServiceDetail = ()=>{
    const  route = useRouter()
    const {service_id} = route.query
 
   
    const {isLoading,data} = useQuery(['getServiceDetail',service_id],()=>getServiceDetail({service_id:typeof service_id==='string'?service_id:'-1'}),{
        'enabled':typeof service_id==='string'?true:false
    })
    const {isLoading:loadingSubbmission,data:submission } = useQuery(['getAllSubmissionOfAService',service_id],()=>getAllSubmissionOfAService({service_id:typeof service_id==='string'?service_id:'-1'}),{
        'enabled':typeof service_id==='string'?true:false
    })

    const prop_columns =[
        
        
        {
            Header:'Approval Status',
            accessor:'status',
        },
        {
            Header:'Update Subbmission',
            accessor:'a',
            Cell:(tableProps:any)=>(
                  <div>


                    <CustomBtn styleType='sec' 
                    onClick={e=>{
                        e.preventDefault()
                        if(tableProps.row.original.status=='pending'){
                            route.push(`/members/services/submission/update/${tableProps.row.original.id}/`)
                        }
                    }}
                    style={{'width':'150px'}}>
                    {
                     tableProps.row.original.status=='pending'?
                     'edit request':"You can't edit aprroved request"
                    }
                        </CustomBtn>   
                  </div>
            )
        },
    ]
    return (
        <DashboardLayout
        title={data?.service_name??''}
        >
            { isLoading && <Spinner />}
                <div style={{'margin':'0 auto','maxWidth':'900px',
                // 'border':'1px solid red'
                }}>
                <div>
                <br /><br />
            <h3>{data?.intro_text}:</h3>
            <ul>
                {
                    data?.fields_subbission.fields?.map((d,index)=>(
                        <li key={index}>Submission of <strong>{d}</strong> </li>
                    ))
                }
                {
                    data?.file_subbission.fields?.map((d,index)=>(
                        <li key={index}>Upload Pdf docs of <strong>{d}</strong> </li>
                    ))
                }
            </ul>
            <br />
            <div style={{'display':'flex','justifyContent':'space-between','alignItems':'center','flexWrap':'wrap','gap':'10px'}}>
            <h2>Previous Applications</h2>
            <CustomBtn  style={{'maxWidth':'200px'}} onClick={e=>{
                route.push(`/members/services/submission/${service_id}/`)
            }}>Apply for {data?.service_name??''}</CustomBtn>
            </div>
            <Table prop_columns={prop_columns} custom_data={submission?submission:[]} />
            </div>
                </div>
        </DashboardLayout>
    )
}

export default CustomServiceDetail