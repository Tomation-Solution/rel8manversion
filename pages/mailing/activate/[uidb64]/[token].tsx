import axios from "axios"
import { useRouter } from "next/dist/client/router"
import { NextPage } from "next/types"
import { useState } from "react"
import CustomBtn from "../../../../components/CustomBtn/Button"
import Spinner from "../../../../components/Spinner"
import { baseURL } from "../../../../helpers/axios"
import useToast from "../../../../hooks/useToast"



const ActivateAccount:NextPage = ()=>{
    const route = useRouter()
    const {uidb64, token} = route.query
    const {notify} = useToast()
    const [status,setStatus] = useState<'loading'|'error'|'okay'|'idle'>('idle')
    const handleRoute = (value:string)=>{
      //
      route.push(value)
    }
  
    const handleValidate = async( )=>{
        //
        window.localStorage.clear() // clear any info that we have on the site so it wont conflit with theEmail Verirfaction
        setStatus('loading')
        try{
          const resp =await  axios.get(`${baseURL}/mailing/activate/${uidb64}/${token}/`)
          setStatus('okay')
          notify('Email Verfication Successfull','success')
          //mission acomplised
        }catch(errr){
          setStatus('error')
          notify('Invalid Token','error')
        }
      }


      return (
        <div style={{'backgroundColor':'#dcdcdc2e','height':'100vh'}}>

        <div style={{'textAlign':'center','display':'flex','alignItems':'center','flexDirection':'column','justifyContent':'center','height':'80vh'}}>
            { status=='loading'?
            <Spinner />
            :''
            }
         {
          status==='okay'?
            <div style={{'maxWidth':'700px',}}>
              <h1 style={{'fontSize':'2.5rem','textAlign':'center','color':'#1c1e21'}}

              >Your Account Has Been<span style={{'color':'#2e3715'}}> Verified</span></h1>
              <br />
              <p style={{'color':'#1c1e21'}}>Login to get to meet other members!!</p> 
              <br />
              <CustomBtn style={{'padding':'1rem','width':'150px','borderRadius':'10px','margin':'0 auto'}}
                onClick={()=>handleRoute('/')}
              >Explore</CustomBtn>
            </div>:
            ''
        }

{
        status==='error'?
        <div style={{'maxWidth':'700px',}}>
        <h1 style={{'color':'#1c1e21'}}>Invalid token or you have been activated</h1>
        <br />
        <p style={{'color':'#1c1e21'}}>or <a style={{'color':'lightgreen','textDecoration':'underline','cursor':'pointer'}} onClick={e=>{
            e.preventDefault()
            handleRoute('/validate')
        }}>validate</a> your acct </p>
        <br />
         
        
        <CustomBtn style={{'padding':'1rem','width':'150px','borderRadius':'10px','margin':'0 auto'}}
          onClick={()=>handleRoute('/')}
        >Try to Sign In</CustomBtn>
      </div>:''
      }


{
          status==='idle'?
            <div style={{'maxWidth':'700px',}}>
        <h1 style={{'color':'#1c1e21'}}>Please Click the button below to  <span style={{'color':'#2e3715'}}> Verify</span> </h1>
        <br />

              <p style={{'color':'#1c1e21'}}>Verify Your Account</p> 
              <br />
              <CustomBtn style={{'padding':'1rem','width':'150px','borderRadius':'10px','margin':'0 auto'}}
                // onClick={()=>handleRoute('/signin')}
                onClick={()=>{
                    handleValidate()
                }}
              >Click me to verify</CustomBtn>
            </div>:
            ''
        }
        </div>
        </div>

      )
}

export default ActivateAccount