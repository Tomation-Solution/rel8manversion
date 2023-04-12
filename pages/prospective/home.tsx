import PropectiveMemberLayout from "../../layout/PropectiveMemberLayout/PropectiveMemberLayout"
import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm ,useFieldArray} from 'react-hook-form';
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import CustomButton from '../../components/CustomBtn/Button'
import { useMutation, useQuery } from "react-query";
import { createForm2Api, getFormoneDataApi, get_admin_rules, submitProspectiveMemberFormOneApi } from "../../redux/prospective.api";
import Spinner from "../../components/Spinner";
import useToast from "../../hooks/useToast";
import { useEffect,useState } from "react";
import UIploadInputwithLabel from "../../components/UIploadInputwithLabel/UIploadInputwithLabel";
import MultiStep  from 'react-multistep'
import StepsDisplay from "../../components/StepsDisplay/StepsDisplay";

export type PropsPectiveFormOneType = {
    data:{name:string,value:string,}[]
}
export type PropsPectiveFormTwoType ={
    dob:any;
    certificate:any;
}

const schema1 =yup.object().shape({
    data:yup.array().of(yup.object({
        value:yup.string().required(),
        name:yup.string().required(),
    }))
})

const schema2 =yup.object().shape({
    dob:yup.mixed(),
    certificate:yup.mixed(),
})
const Home = ()=>{
    const {notify} = useToast()
    const {
        register,control,handleSubmit, formState: { errors },setValue,reset,
    } = useForm<PropsPectiveFormOneType>({resolver:yupResolver(schema1),defaultValues:{
        'data':[
            
        ]
    }})

    
    const {fields,append,remove} = useFieldArray({
        name:'data',control
    })

    const {mutate:getAdminRules,isLoading:loadingRuules} = useMutation(get_admin_rules,{
        'onSuccess':(data)=>{
            console.log({'rules':data})
            reset({'data':data.text_fields.map((name,index)=>{
                return {name,'value':'empty'}
            })})

        }
    })
    const {isLoading,mutate} = useMutation(submitProspectiveMemberFormOneApi,{
        'onSuccess':()=>{
            notify('Form One Saved','success')
        }
    })
    const {isLoading:loadingformone,data} = useQuery('getFormoneDataApi',getFormoneDataApi,{
        refetchOnWindowFocus:false
    })

    const submitData:SubmitHandler<PropsPectiveFormOneType>=(data)=>{
        mutate(data)
        // console.log('Net Thing',data)
    }

    const {
        register:registerForm2,handleSubmit:handleSubmitForm2, formState: { errors:errors2 },setValue:setValue2
    } = useForm<PropsPectiveFormTwoType>({resolver:yupResolver(schema2)})
    const {mutate:createForm2,isLoading:creatingform2} = useMutation(createForm2Api,{
        'onSuccess':()=>{
            notify('Form Two Saved','success')
        },
        'onError':()=>{
            notify('Form Two Saved','success')
        }
    })
    const submitDataForm2:SubmitHandler<PropsPectiveFormTwoType>=(data)=>{
        // console.log(data)
        createForm2(data)
    }




    useEffect(()=>{
        if(data){
            reset({'data':data.info})
        }else{
            // get structure
            getAdminRules()
        }
    },[data])

    const [step,setStep] = useState(0)
    return (
        <PropectiveMemberLayout>
            
            <div style={{'maxWidth':'700px','margin':'0 auto'}}>
            {
                    (isLoading||loadingformone||creatingform2||loadingRuules)?<Spinner/>:''
                }
                <StepsDisplay count={2} currentNumber={step}/>
              
                <div>
                    <h1>Prospective Member Application</h1>
                </div>
                <br /><br /><br /><br />
                {
                    step==0?
                <form onSubmit={handleSubmit(submitData)} >
                    <br />

                   <div >
                   {
                        fields.map((data,index)=>(
                            <div key={index} style={{'display':'grid','gridTemplateColumns':'1fr 1fr','gap':'20px','margin':'10px 0'}}>
                                <InputWithLabel 
                                isShowLabel={true}
                                label={'Name'}
                                register={register(`data.${index}.name`)}
                                />

                                <InputWithLabel 
                                isShowLabel={true}
                                label={'Value'}
                                register={register(`data.${index}.value`)}
                                />
                            </div>        
                        ))
                    }
                    <CustomButton styleType="sec" style={{'width':'150px'}} onClick={e=>{
                        e.preventDefault()
                        append({'name':'empty name','value':'empty name'})
                    }}>
                        Append
                    </CustomButton>
                    <br />
                   </div>
                   <br />
                   <div style={{'display':'flex','justifyContent':'space-between','maxWidth':'400px','margin':'0 auto'}}>
                        <CustomButton style={{'width':'150px',}}>Save</CustomButton>
                    <CustomButton style={{'width':'150px',}} onClick={e=>{
                        e.preventDefault()
                        setStep(1)
                    }}>Next</CustomButton>
                   </div>
                </form>:''
                }

                {
                    step==1?
                    <form onSubmit={handleSubmitForm2(submitDataForm2)}>
                    <br />
                    
                    <div style={{'display':'grid','gridTemplateColumns':'1fr 1fr','gap':'20px'}}>
                        <UIploadInputwithLabel
                        label="Dob"
                        name="dob"
                        setValue={setValue}
                        />
                        <UIploadInputwithLabel
                        label="certificate"
                        name="certificate"
                        setValue={setValue}
                        />
                    </div>
                    <br />
                    <div style={{'display':'flex','justifyContent':'space-between','maxWidth':'400px','margin':'0 auto'}}>
                        <CustomButton style={{'width':'150px','margin':'0 auto'}}
                         onClick={e=>{
                            e.preventDefault()
                            setStep(0)
                        }}
                        >Previous</CustomButton>
                        <CustomButton style={{'width':'150px','margin':'0 auto'}}>Save</CustomButton>
                    </div>
                </form>:''
                }

            </div>


        </PropectiveMemberLayout>
    )
}

export default Home