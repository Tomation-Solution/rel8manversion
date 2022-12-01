type  userTypeForThisPageInput = 'memeber' | "admin" |"super_admin"



export const TypeVerifierUserChecker = (userTypeForThisPage:userTypeForThisPageInput[]):boolean=>{
    
    if(typeof window !== 'undefined'){
        let user = window.localStorage.getItem('token')
        //this function accepet userTypeForThisPageInput if the logged in user_type exists in the array then it will return true else false
        if (user){
             const logged_in_user:any = JSON.parse(user)
             return userTypeForThisPage.includes(logged_in_user.user_type)
        }

    }
    
    return false
}