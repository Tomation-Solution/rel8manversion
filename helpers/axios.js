import * as axiosOriginal from 'axios';


//this app is only for anni so just hard code the short name here
export const tenantName = 'migos'
export const sitename = 'localhost:8000'
// export const baseURL= `https://rel8-backend-production.up.railway.app/tenant/${tenantName}`
export const baseURL= `http://localhost:8000/tenant/${tenantName}`
const axios = axiosOriginal.create({
    baseURL,
})

export default axios;