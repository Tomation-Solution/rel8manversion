import { useMutation, useQuery } from "react-query"
import CustomBtn from "./CustomBtn/Button"
import { PaymentRegisterationAPi } from "../redux/auth/signup/signupApi"
import Spinner from "./Spinner"
import useToast from "../hooks/useToast"
import { get_admin_rules } from "../redux/prospective.api"




const HandleProspectiveRegistrationPayment = ():React.ReactElement=>{
    const {notify} =useToast()
    const {isLoading,mutate}= useMutation(PaymentRegisterationAPi,{
        'onSuccess':(data)=>{
            localStorage.clear()
            window.location.href=data.data.authorization_url
        },
        'onError':(err:any)=>{
            console.log({err})
        if(err.response.data.message.error){
            notify(err.response.data.message.error,'error')
        }
        }
    })


    const {data,isLoading:loadingRuules} = useQuery('rules',get_admin_rules,{    
    })
    console.log(data)
    return(
        <div style={{'padding':'1.4rem','textAlign':'center'}}>
            {
                (isLoading||loadingRuules)?
                <Spinner/>:''
            }
            <br /><br /><br />
            <h2>To proceed with your registration, you will need to pay a registration fee.</h2>
                <br />

            <CustomBtn style={{'width':'200px','margin':'0 auto'}} onClick={e=>{
                mutate()
            }}>Pay Now</CustomBtn>
        </div>
    )
}


export default HandleProspectiveRegistrationPayment