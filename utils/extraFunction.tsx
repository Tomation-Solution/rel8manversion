import { MemberType } from "../redux/members/membersApi"
/* @ts-ignore */
import cookieCutter from 'cookie-cutter'




export type UserType = {
  "token": string,
  "user_type": "members"|'admin'|'super_admin',
  "chapter": {
      "name": string,
      "id": number
  }[],
  "council": {
          "name": string,
          "id": number,
          "chapter": any
      }[],
  "commitee": 
      {
          "name": string,
          "id": number
      }[]
  ,
  "user_id": number,
  "member_id": string,
  "profile_image":string | null
}









export type StyleTpe =  {
    'style'?:{
      [Key:string]:string,
    }
  }
  
  export const createExternalStyle = (props:StyleTpe)=>{
    let styles =''
    if(props.style){
      const all_keys = Object.keys(props.style)
      all_keys.map((key=>{
        if(props.style){
          styles = styles+` ${key}:${props.style[key]}`
        }
        return key
      }))
    } 
    return styles
  }
  

export const FetchName = (member:MemberType):string=>{
  const name:any = member.member_info.find(d=>{
    return d.name.toLocaleLowerCase() == 'name' ||  d.name.toLocaleLowerCase() == 'first' ||d.name.toLocaleLowerCase() == 'first name' || d.name.toLocaleLowerCase() == 'surname'
})['value']
if(typeof name==='string'){
  return name
}
 return `Member (${member.id})`
}

export const FetchNameByMemberInfo = (member_info:MemberType['member_info']):string=>{
  const name:any = member_info.find(d=>{
    return d.name.toLocaleLowerCase() == 'name' ||  d.name.toLocaleLowerCase() == 'first' ||d.name.toLocaleLowerCase() == 'first name' || d.name.toLocaleLowerCase() == 'surname'
})['value']
if(typeof name==='string'){
  return name
}
 return `Member`
}

export const FetchMembershipNo = (member:MemberType):string=>{
  const name:any = member.member_info.find(d=>{
    return d.name == 'MEMBERSHIP_NO' 
})['value']

if(typeof name==='string'){
  return name
}

 return `Member (${member.id})`
}


export const generate_url_params= ():string=>{
  let url_status:any = localStorage.getItem('url_status')
  let lookup ='?not_council=True&not_commitee=True&not_chapters=True'
  if(url_status){
      url_status = JSON.parse(localStorage.getItem('url_status'))

      if(url_status.status=='council'){
          lookup = `?council=${url_status.id}`
      }
      if(url_status.status=='chapter'){
          lookup = `?chapters=${url_status.id}`
      }
      if(url_status.status=='comittee'){
          lookup = `?commitee=${url_status.id}`
      }
  }


  return lookup
}


type getUserOrNullResponse = null | UserType
export const getUserOrNull = ():getUserOrNullResponse=>{
  const user  = localStorage.getItem('token')
  if (user) {
    return JSON.parse(user)
  }
  return null

}

export type ProspectiveMember = {
  user_type:'prospective_members';
  token:string;
  has_paid:boolean;
  prospective_member_id:3;
}
type getPropspectiveMemberOrNullResponse = null | ProspectiveMember
export const getPropspectiveMemberOrNull = ():getPropspectiveMemberOrNullResponse=>{
  const user  = localStorage.getItem('token')
  if (user) {
    return JSON.parse(user)
  }
  return null

}


