import { MemberType } from "../redux/members/membersApi"

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