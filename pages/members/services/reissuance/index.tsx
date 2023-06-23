import { DashboardLayout } from "../../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel"
import {useState} from 'react'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm,useFieldArray } from 'react-hook-form';
import CustomBtn from "../../../../components/CustomBtn/Button";
import axios from "../../../../helpers/axios";
import { useMutation, useQuery } from "react-query";
import {useEffect} from 'react'
import Spinner from "../../../../components/Spinner";
import useToast from "../../../../hooks/useToast";
import moment from "moment";
import { useRouter } from "next/router";
type ResuissuanceForm={
    "id": number,
    "yearly_turn": {
        "date_one":string ,
        "date_two": string,
        "file_fordate_one":string,
        "file_fordate_two": string,
    },
    extras:{
        plants:{data:{name:string}[]} ,
        products_manufactured:{data:{name:string}[]},
        imported_raw_materials:{data:{name:string}[]},
    },
    name_of_company:string,
    cac_number:string,
    tax_identification_number:string,
    corporate_addresse:string,
    company_official_email:string,
    ceo_name:string,
    phone_number:string,
    chief_finace_officer:string,
    chief_finace_officer_phone_number:string,
    head_of_coporate:string,
    head_of_coporate_phone_number:string,
    officer_handling_man:string,
    officer_handling_man_phone_number:string ,
    man_reg_number:string

    // yearly turn over
    file_fordate_one:string,
    file_fordate_two:string,
    date_one:string,
    date_two:string,
}
const getReissuanceForm= async ():Promise<ResuissuanceForm>=>{
    const resp = await axios.get('/tenant/membershipservice/1/')
    return resp.data.data
}
const updateReIssuanceForm = async (data:FormType):Promise<ResuissuanceForm>=>{
    const form = new FormData()

    form.append('name_of_company',data.name_of_company)
    form.append('cac_number',data.cac_number)
    form.append('tax_identification_number',data.tax_identification_number)
    form.append('corporate_addresse',data.corporate_addresse)
    form.append('company_official_email',data.company_official_email)
    // form.append('plants',JSON.stringify(data.plants))
    // form.append('products_manufactured',JSON.stringify(data.products_manufactured))
    // form.append('imported_raw_materials',JSON.stringify(data.imported_raw_materials))
    // form.append('plants','[' + data.plants.map(obj => JSON.stringify(obj)).join(',') + ']')
    // form.append('products_manufactured','[' + data.products_manufactured.map(obj => JSON.stringify(obj)).join(',') + ']')
    // form.append('imported_raw_materials','[' + data.imported_raw_materials.map(obj => JSON.stringify(obj)).join(',') + ']')

    
    
//
  
    // form.append('products_manufactured',JSON.stringify({'data':data.products_manufactured}))
    // form.append('imported_raw_materials',JSON.stringify({'data':data.imported_raw_materials}))
    
    form.append('ceo_name',data.ceo_name)
    form.append('phone_number',data.phone_number)
    form.append('chief_finace_officer',data.chief_finace_officer)
    form.append('chief_finace_officer_phone_number',data.chief_finace_officer_phone_number)
    form.append('head_of_coporate',data.head_of_coporate)
    form.append('head_of_coporate_phone_number',data.head_of_coporate_phone_number)
    form.append('officer_handling_man',data.officer_handling_man)
    form.append('officer_handling_man_phone_number',data.officer_handling_man_phone_number)
    form.append('man_reg_number',data.man_reg_number)
    form.append('file_fordate_one',data.file_fordate_one[0])
    form.append('file_fordate_two',data.file_fordate_two[0])
    form.append('date_two',moment(data.date_one).format("YYYY-MM-DD"))
    form.append('date_one', moment(data.date_two).format("YYYY-MM-DD"))

    const resp = await axios.patch('/tenant/membershipservice/1/',form)
    return resp.data.data
}

const schema = yup.object().shape({
    name_of_company:yup.string().required(),
    cac_number:yup.string().required(),
    tax_identification_number:yup.string().required(),
    corporate_addresse:yup.string().required(),
    company_official_email:yup.string().email().required(),
    plants:yup.array().of(yup.object().shape({name:yup.string()})),
    products_manufactured:yup.array().of(yup.object().shape({name:yup.string()})),
    imported_raw_materials:yup.array().of(yup.object().shape({name:yup.string()})),
    ceo_name:yup.string().required(),
    phone_number:yup.string().required(),
    chief_finace_officer:yup.string().required(),
    chief_finace_officer_phone_number:yup.string().required(),
    head_of_coporate:yup.string().required(),
    head_of_coporate_phone_number:yup.string().required(),
    officer_handling_man:yup.string().required(),
    officer_handling_man_phone_number:yup.string().required(),
    man_reg_number:yup.string().required(),


    // yearly turn over
    file_fordate_one:yup.mixed(),
    file_fordate_two:yup.mixed(),
    date_one:yup.date().required(),
    date_two:yup.date().required(),

})
type FormType = {
    name_of_company:string,
    cac_number:string,
    tax_identification_number:string,
    corporate_addresse:string,
    company_official_email:string,
    plants:{name:string}[] ,
    products_manufactured:{name:string}[],
    imported_raw_materials:{name:string}[],
    ceo_name:string,
    phone_number:string,
    chief_finace_officer:string,
    chief_finace_officer_phone_number:string,
    head_of_coporate:string,
    head_of_coporate_phone_number:string,
    officer_handling_man:string,
    officer_handling_man_phone_number:string ,
    man_reg_number:string

    // yearly turn over
    file_fordate_one:string,
    file_fordate_two:string,
    date_one:string,
    date_two:string,

}
const ReIssuance = ()=>{
    const label ={'textTransform':'capitalize','padding':'.4rem 0','display':'inline-block','fontWeight':'bold'}
    const {notify} = useToast()
    const route = useRouter()
    const {nextpage} = route.query
    console.log({nextpage})
    //   const queyrParams = useSearchParams()
    const { register, handleSubmit,control, setValue,formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
      });
      
      const {isLoading,data} = useQuery('getReissuanceForm',getReissuanceForm,{
        'onSuccess':(data)=>{
            console.log(data)
            if(data){

                    setValue('name_of_company',data.name_of_company)
                    setValue('cac_number',data.cac_number)
                    setValue('tax_identification_number',data.tax_identification_number)
                    setValue('corporate_addresse',data.corporate_addresse)
                    setValue('company_official_email',data.company_official_email)
                    setValue('plants',data.extras.plants.data)
                    setValue('products_manufactured',data.extras.products_manufactured.data)
                    setValue('imported_raw_materials',data.extras.imported_raw_materials.data)
                    setValue('ceo_name',data.ceo_name)
                    setValue('chief_finace_officer',data.chief_finace_officer)
                    setValue('chief_finace_officer_phone_number',data.chief_finace_officer_phone_number)
                    setValue('head_of_coporate',data.head_of_coporate)
                    setValue('head_of_coporate_phone_number',data.head_of_coporate_phone_number)
                    setValue('officer_handling_man',data.head_of_coporate_phone_number)
                    setValue('officer_handling_man_phone_number',data.officer_handling_man)
                   
                    


                    setValue('file_fordate_one',data.file_fordate_one)
                    setValue('file_fordate_two',data.file_fordate_two)
                    setValue('date_one',data.date_one)
                    setValue('date_two',data.date_two)
        
            }
        },
        'refetchOnWindowFocus':false
      })
      const {isLoading:updating,mutate}= useMutation(updateReIssuanceForm,{
        'onSuccess':(data)=>{
            notify('Uploaded Successfully','success')
            // let nextpage = queyrParams.get('next')
            if(nextpage ==='section-a'){
                route.push('/members/services/reissuance/section-a/')
            }
            if(nextpage ==='section-b'){
                route.push('/members/services/reissuance/section-b/')
            }
            if(nextpage==='deactivation_or_suspension_of_membership'){
                route.push('/members/services/deactivation_or_suspension_of_membership')
            }
            if(nextpage==='update_on_product_manufactured'){
                route.push('/members/services/update_on_product_manufactured')
            }
        },
        'onError':(error:any)=>{
            notify('Please check your network conntection')
            console.log({'backend error':error})
        }
      })
      
  const { fields:plants__fields, append:plants__append,
    remove:plants__remove } = useFieldArray({
    control,
    name: "plants", 
  });


  const { fields:products_manufactured__fields, append:products_manufactured__append,
    remove:products_manufactured__remove } = useFieldArray({
    control,
    name: "products_manufactured", 
  });
  
  const { fields:imported_raw_materials__fields, append:imported_raw_materials__append,
    remove:imported_raw_materials__remove } = useFieldArray({
    control,
    name: "imported_raw_materials", 
  });

  const onSubmit = (data: FormType) =>{
    mutate(data) 
    // notify('Submitted Successfully','success')
  }
//   console.log(errors)


// useEffect(()=>{
//     setValue('name_of_company','A & P Foods Limited')
//     setValue('cac_number','RC12534542')
//     setValue('tax_identification_number','3435454')
//     setValue('corporate_addresse','12 Royal Avuenue ,Abuja, Nigeria')
//     setValue('company_official_email','hakan.misri@oladisglobal.com')
//     setValue('plants',[{'name':'Abuja'},{'name':'lagos'}])
//     setValue('products_manufactured',[{'name':'Salt'},{'name':'oil'}])
//     setValue('imported_raw_materials',[{'name':'thick meat'},{'name':'goose rice'}])
//     setValue('ceo_name','Matthew eww')
//     setValue('chief_finace_officer','mr kunle')
//     setValue('chief_finace_officer_phone_number','08162047348')
//     setValue('head_of_coporate','mr dunsin')
//     setValue('officer_handling_man','mr mandu')
//     setValue('officer_handling_man_phone_number','08162041239')
// },[])
    console.log(errors)
    return (
        <DashboardLayout
        title={'Update Reissuance Form'} 
        >
            {
                (isLoading||updating)?
                <Spinner />:''
            }
             <form  
             onSubmit={handleSubmit(onSubmit)}
             style={{'margin':'0 auto','maxWidth':'900px'}}>
                <br /><br /><br /><br />
                <InputWithLabel
                label="Name Of Company"
                register={register('name_of_company')}
                isShowLabel={true}
                />

                <InputWithLabel
                label="Cac number"
                register={register('cac_number')}
                isShowLabel={true}
                />

<InputWithLabel
                label="Tax identification number"
                register={register('tax_identification_number')}
                isShowLabel={true}
                />

<InputWithLabel
                label="man reg number"
                register={register('man_reg_number')}
                isShowLabel={true}
                />


<InputWithLabel
                label="Company official email"
                register={register('company_official_email')}
                errorMessage={errors.company_official_email?.message}
                isShowLabel={true}
                />

<InputWithLabel
                label="Corporate Addresse"
                register={register('corporate_addresse')}
                isShowLabel={true}
                />

<InputWithLabel
                label="Yearly Turn Over Date"
                register={register('date_one')}
                isShowLabel={true}
                type='date'
                />
                <br />
                <InputWithLabel
                label="Yearly Turn Over file"
                register={register('file_fordate_one')}
                isShowLabel={true}
                type='file'
                />
                <br />
                
<InputWithLabel
                label="Yearly Turn Over Date(second year)"
                register={register('date_two')}
                isShowLabel={true}
                type='date'
                />
                <br />

                <InputWithLabel
                label="Yearly Turn Over file (second year)"
                register={register('file_fordate_two')}
                isShowLabel={true}
                type='file'
                />
                <br />


        <label
        style={{'textTransform':'capitalize','padding':'.4rem 0','display':'inline-block','fontWeight':'bold'}}
        >Plants</label>
        {
            plants__fields.map((d,index)=>(
                <div
                key={index}
                style={{'display':'flex','alignItems':'center'}}
                >
                   <div style={{'width':'80%'}}> 
                   <InputWithLabel
                label="Corporate Addresse"
                register={register(`plants.${index}.name`)}
                isShowLabel={false}
                />
                   </div>
                <CustomBtn
            onClick={e=>{
                e.preventDefault()
                plants__remove(index)
            }}
            styleType="pry" style={{
                // 'width':'40%',
                // 'padding':'.5rem',
                'backgroundColor':'red',
                'color':'white',
                'width':'10%'
            }}>
            delete
            </CustomBtn> 
                </div>
            ))
        }
        <br />

            <CustomBtn
            onClick={e=>{
                e.preventDefault()
                plants__append({
                    'name':'..'
                })
            }}
            styleType="sec" style={{
                'width':'40%',
                'padding':'.5rem'
            }}>
            Add more
            </CustomBtn>
            <br />
            <br />


            <label
        style={{'textTransform':'capitalize','padding':'.4rem 0','display':'inline-block','fontWeight':'bold'}}
        >Imported Raw Materials</label>
        {
            imported_raw_materials__fields.map((d,index)=>(
                <div
                key={index}
                style={{'display':'flex','alignItems':'center'}}
                >
                   <div style={{'width':'80%'}}> 
                   <InputWithLabel
                label="Corporate Addresse"
                register={register(`plants.${index}.name`)}
                isShowLabel={false}
                />
                   </div>
                <CustomBtn
            onClick={e=>{
                e.preventDefault()
                imported_raw_materials__remove(index)
            }}
            styleType="pry" style={{
                // 'width':'40%',
                // 'padding':'.5rem',
                'backgroundColor':'red',
                'color':'white',
                'width':'10%'
            }}>
            delete
            </CustomBtn> 
                </div>
            ))
        }
        <br />

            <CustomBtn
            onClick={e=>{
                e.preventDefault()
                imported_raw_materials__append({
                    'name':'..'
                })
            }}
            styleType="sec" style={{
                'width':'40%',
                'padding':'.5rem'
            }}>
            Add more
            </CustomBtn>
            <br />
            <br />



            <label
        style={{'textTransform':'capitalize','padding':'.4rem 0','display':'inline-block','fontWeight':'bold'}}
        >Products Manufactured</label>
        {
            products_manufactured__fields.map((d,index)=>(
                <div
                key={index}
                style={{'display':'flex','alignItems':'center'}}
                >
                   <div style={{'width':'80%'}}> 
                   <InputWithLabel
                label="Corporate Addresse"
                register={register(`plants.${index}.name`)}
                isShowLabel={false}
                />
                   </div>
                <CustomBtn
            onClick={e=>{
                e.preventDefault()
                products_manufactured__remove(index)
            }}
            styleType="pry" style={{
                // 'width':'40%',
                // 'padding':'.5rem',
                'backgroundColor':'red',
                'color':'white',
                'width':'10%'
            }}>
            delete
            </CustomBtn> 
                </div>
            ))
        }
        <br />

            <CustomBtn
            onClick={e=>{
                e.preventDefault()
                products_manufactured__append({
                    'name':'..'
                })
            }}
            styleType="sec" style={{
                'width':'40%',
                'padding':'.5rem'
            }}>
            Add more
            </CustomBtn>
            <br />
            <br />
{/* <InputWithLabel
                label="Plants"
                register={register('plants')}
                isShowLabel={true}
                /> */}

{/* label */}
            <fieldset>
                <legend>
                    Ceo Details
                </legend>
                <InputWithLabel
                label="Name"
                register={register('ceo_name')}
                isShowLabel={true}
                />
                <br />
                <InputWithLabel
                label="Phone Number"
                register={register('phone_number')}
                isShowLabel={true}
                />

            </fieldset>


            <br />

            <fieldset>
                <legend>
                Chief Finace Officer
                </legend>
                <InputWithLabel
                label="Name"
                register={register('chief_finace_officer')}
                isShowLabel={true}
                />
                <br />
                <InputWithLabel
                label="Phone Number"
                register={register('chief_finace_officer_phone_number')}
                isShowLabel={true}
                />

            </fieldset>
            <br />

            <fieldset>
                <legend>
                Head Of Corporate
                </legend>
                <InputWithLabel
                label="Name"
                register={register('head_of_coporate')}
                isShowLabel={true}
                />
                <br />
                <InputWithLabel
                label="Phone Number"
                register={register('head_of_coporate_phone_number')}
                isShowLabel={true}
                />

            </fieldset>
                <br />
            <fieldset>
                <legend>
                Officer handling man
                </legend>
                <InputWithLabel
                label="Name"
                register={register('officer_handling_man')}
                isShowLabel={true}
                />
                <br />
                <InputWithLabel
                label="Phone Number"
                register={register('officer_handling_man_phone_number')}
                isShowLabel={true}
                />

            </fieldset>
            {/* <br />
                <InputWithLabel
                label="Chief Finace Officer"
                register={register('chief_finace_officer')}
                isShowLabel={true}
                />
                                               <br />
                <InputWithLabel
                label="Chief Finace Officer"
                register={register('chief_finace_officer_phone_number')}
                isShowLabel={true}
                /> */}
                <CustomBtn>
                    Submit & Continue
                </CustomBtn>
        </form>
        </DashboardLayout>
    )
}

export default ReIssuance