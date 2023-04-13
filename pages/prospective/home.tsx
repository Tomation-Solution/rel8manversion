import PropectiveMemberLayout from "../../layout/PropectiveMemberLayout/PropectiveMemberLayout"
import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm ,useFieldArray} from 'react-hook-form';
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import CustomButton from '../../components/CustomBtn/Button'
import { useMutation, useQuery } from "react-query";
import { createForm2Api, deleteAFileFromForm2Api, getFormoneDataApi, get_admin_rules, gettForm2Api, submitProspectiveMemberFormOneApi } from "../../redux/prospective.api";
import Spinner from "../../components/Spinner";
import useToast from "../../hooks/useToast";
import { useEffect,useState } from "react";
import UIploadInputwithLabel from "../../components/UIploadInputwithLabel/UIploadInputwithLabel";
import MultiStep  from 'react-multistep'
import StepsDisplay from "../../components/StepsDisplay/StepsDisplay";

export type PropsPectiveFormTwoType ={
    data:{
        dataID?:number;
        name:string;
        preview?:string;
        file?:any;
    }[];
}


const schema2 =yup.object().shape({
    data:yup.array().of(yup.object({
        dataID:yup.number(),
        name:yup.string().required(),
        preview:yup.string(),
        file:yup.mixed(),
    }))
})

const FormTwo = ({setStep}:{setStep:any})=>{
    const {notify} = useToast();
    const {data,isLoading,refetch} = useQuery('gettForm2Api',gettForm2Api)
    const {
        register,control,handleSubmit:handleSubmitForm2,reset, formState: { errors:errors2 },setValue:setValue2
    } = useForm<PropsPectiveFormTwoType>({resolver:yupResolver(schema2),defaultValues:{
        'data':[],
    }})
    const {fields,append,remove} = useFieldArray({
        name:'data',control
    })

    const {mutate:createForm2,isLoading:creatingform2} = useMutation(createForm2Api,{
        'onSuccess':()=>{
            notify('Form Two Saved','success')
            refetch()
        },
        'onError':()=>{
            notify('Form Two Saved','success')
        }
    })

    const {mutate:getAdminRules,isLoading:loadingRuules} = useMutation(get_admin_rules,{
        'onSuccess':(data)=>{
            console.log({'rules':data})
            reset({
                'data':data.file_fields.map((name,index)=>({
                    name,
                }))
            })
        }
    })

    const {mutate:deleteFile,isLoading:deletingffile} = useMutation(deleteAFileFromForm2Api,{
        'onSuccess':()=>{
            notify('deleted success','error')
        }
    })
    const submitDataForm2:SubmitHandler<PropsPectiveFormTwoType>=(data)=>{
        createForm2(data)
    }

    useEffect(()=>{
        if(data?.files.length!==0){
            //udate the data
            reset({
                'data':data?.files.map((d,index)=>({
                    'dataID':d.id,
                    'name':d.name,
                    'preview':d.file,
                }))               
            })
        }else{
            // create the type of data to expect
            // reset
            getAdminRules()
        }
    },[data])
    return (
        <form onSubmit={handleSubmitForm2(submitDataForm2)}>
                    <br />
                    {
                        (creatingform2||isLoading||loadingRuules||deletingffile)?<Spinner/>:''
                    }
                    
                    <div style={{'display':'flex','gap':'10px','flexWrap':'wrap'}}>
                        {
                            fields.map((field,index)=>(
                                <div key={index}>
                                    <InputWithLabel 
                                    label={field.name}
                                    register={register(`data.${index}.name`)}
                                    />
                                    <input type="file"
                                    onChange={e=>{
                                        // {...register(`data.${index}.file`)} />
                                        setValue2(`data.${index}.file`,e.target.files[0])
                                    }} />
                                    
                                    {
                                        field.preview?
                                            <a style={{'textDecoration':'underline','color':'#2e3715','cursor':'pointer'}} onClick={e=>{
                                                window.open(field.preview,'_blank')
                                            }}>view current upload</a>
                                    :''
                                    }
                                    
                                    {
                                        field.id?
                                        <CustomButton 
                                        style={{'width':'70px'}}
                                        styleType="sec"
                                        onClick={e=>{
                                            e.preventDefault()
                                            if(field.dataID){
                                                //delete fromm saver
                                                deleteFile(field.dataID)
                                            }else{
                                                remove(index)
                                            }
                                        }}
                                        >
                                            Delete
                                        </CustomButton>:''
                                    }
                                </div>
                            ))
                        }
                        
                    </div>
                    <br />

                    <CustomButton styleType="sec" style={{'width':'150px'}} onClick={e=>{
                        e.preventDefault()
                        append({'name':'enter a file name',})
                    }}>
                        Append
                    </CustomButton>
                    <br />
                    <br />
                    <div style={{'display':'flex','justifyContent':'space-between','maxWidth':'400px',}}>
                        <CustomButton style={{'width':'150px','margin':'0 auto'}}
                         onClick={e=>{
                            e.preventDefault()
                            setStep(0)
                        }}
                        >Previous</CustomButton>
                        <CustomButton style={{'width':'150px','margin':'0 auto'}}>Save</CustomButton>
                    </div>
                </form>
    )
}


export type PropsPectiveFormOneType = {
    data:{name:string,value:string,}[]
}

const schema1 =yup.object().shape({
    data:yup.array().of(yup.object({
        value:yup.string().required(),
        name:yup.string().required(),
    }))
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
                    (isLoading||loadingformone||loadingRuules)?<Spinner/>:''
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
                    <FormTwo
                    setStep={setStep}
                    />
                    :''
                }

            </div>


        </PropectiveMemberLayout>
    )
}

export default Home