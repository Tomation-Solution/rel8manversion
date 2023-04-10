import * as axiosOriginal from 'axios';


//this app is only for anni so just hard code the short name here
export const tenantName = 'migos'
export const sitename = 'rel8backend-production.up.railway.app'
// export const sitename = 'http://localhost:8000'
// export const baseURL= `http://localhost:8000/tenant/${tenantName}`
export const baseURL= `https://rel8backend-production.up.railway.app/tenant/${tenantName}`
const axios = axiosOriginal.create({
    baseURL,
})

export default axios;