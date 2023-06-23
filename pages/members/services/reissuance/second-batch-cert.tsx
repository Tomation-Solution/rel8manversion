import GreenButton from "../../../../components/Buttonn"
import CustomBtn from "../../../../components/CustomBtn/Button"
import { DashboardLayout } from "../../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel"

import {useRouter} from 'next/router'
import useToast from "../../../../hooks/useToast"


const SecondBatchCert= ()=>{
    const route = useRouter()
    const {notify} = useToast()
    return (
        <DashboardLayout title={'Companies that have the 2nd batch of MAN Membership Certificate'}>
        <div  style={{'margin':'0 auto','maxWidth':'900px'}}>
        <GreenButton text='Updated Re Issuance Form' radius='10px'
                click={(e)=>{
                    route.push('/members/services/reissuance/')
                }}
                style={{'width':'30%'}}
               textColor='white' paddingY={1} paddingX={1}  bg='#2e3715'/>
        <form >
                <br /><br /><br /><br />
                <InputWithLabel 
                label="Certificate Which Expired on 31 Dec"
                isShowLabel={true}
                type="file"
                />
<br />
<InputWithLabel 
                label="Copy Of Certificate Incoporation"
                isShowLabel={true}
                type="file"
                />
<br />

<InputWithLabel 
                label="Audited Finicial Statement (One)"
                isShowLabel={true}
                type="file"
                />
<br />


<InputWithLabel 
                label="Audited Finicial Statement (Two)"
                isShowLabel={true}
                type="file"
                />
<br />

                <CustomBtn
                onClick={e=>{
                    e.preventDefault()
                    notify("Uploaded Successfully",'success')
                }}
                >
                    Submit
                </CustomBtn>

        </form>
        </div>
        </DashboardLayout>
    )
}

export default SecondBatchCert