import { useMutation } from "react-query"
import CustomBtn from "./CustomBtn/Button"
import { PaymentRegisterationAPi } from "../redux/auth/signup/signupApi"
import Spinner from "./Spinner"
import useToast from "../hooks/useToast"




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
    
    return(
        <div style={{'padding':'1.4rem','textAlign':'center'}}>
            {
                isLoading?
                <Spinner/>:''
            }
            <br /><br /><br />
            <h2>It appears you have not paid the registration fee</h2>
                <br />

            <CustomBtn style={{'width':'200px','margin':'0 auto'}} onClick={e=>{
                mutate()
            }}>Pay Now</CustomBtn>
        </div>
    )
}


export default HandleProspectiveRegistrationPayment