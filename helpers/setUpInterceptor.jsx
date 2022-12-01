import axiosInstance from "./axios";
import {getTokenorEmptyString} from "./auth.helper";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // check if request is made from tenant or service account
      let token;
    
      if(window.location.pathname.includes('/admin')|| window.location.pathname.includes('/member')){
        token = getTokenorEmptyString()
      }
      console.log({"some fuc":getTokenorEmptyString()})
      // Set the auth header before sending the request
      if (token) {
          config.headers["Authorization"] = "Token " + token;
        }
      return config;
    },
    (error) => {
      // Do something with request error
      console.log("This is request error", error);
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  
};

export default setup;