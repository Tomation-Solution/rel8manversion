import * as axiosOriginal from 'axios';


//this app is only for anni so just hard code the short name here
export const tenantName = 'man'
export const sitename = 'web-production-d5b0.up.railway.app'
// export const baseURL= `https://rel8-backend-production.up.railway.app/tenant/${tenantName}`
export const baseURL= `https://web-production-d5b0.up.railway.app/tenant/${tenantName}`
const axios = axiosOriginal.create({
    baseURL,
})

export default axios;