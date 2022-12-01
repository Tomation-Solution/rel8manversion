

export const isLoggedIn = ()=>localStorage.getItem("token")?true:false

// type IsSuperadmin_or_AdminInput = ['super_admin',"admin"]
export const IsSuperadmin_or_Admin = ()=>{
    // let ans = false
    if(!isLoggedIn){
        return false
    }
    const user = JSON.parse(localStorage.getItem("token"))
    if(!user)return false

    if(["super_admin",'admin'].includes(user.user_type)){
        return true
    }
    return false
}

export const getTokenorEmptyString  =()=>{
   
    const user = JSON.parse(localStorage.getItem("token"))
    if(user){
        return user?.token
    }
    return "."
}