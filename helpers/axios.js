import React from 'react'
import * as axiosOriginal from 'axios';


//this app is only for anni so just hard code the short name here
export const tenantName = 'man'
// export const sitename = 'http://localhost:8000'
// export const baseURL= `http://localhost:8000/tenant/${tenantName}`
export const sitename = 'rel8corporate.watchdoglogisticsng.com'
export const baseURL= `https://rel8corporate.watchdoglogisticsng.com/tenant/${tenantName}`
const axios = axiosOriginal.create({
    baseURL,
})

export default axios;
