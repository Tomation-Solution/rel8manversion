// import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setupInterceptors from "../helpers/setUpInterceptor"
import NextNProgress from 'nextjs-progressbar';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import firebase, { firebaseConfig } from "../public/firebase-messaging-sw";


 let messaging= null
 if (typeof window !== 'undefined'){
   messaging = getMessaging(firebase);

 }


function MyApp({ Component, pageProps }) {
  if(messaging){
    console.log({messaging})
    getToken(messaging, 
      {
        // vapidKey: 'BOh1eVZZI8UBpFaKe2mGF_wBqST0ysuSmwMt5Sm7CgVZfoX9JHDhRJl0_EXD7vmotpJ_XAfb80fGtV2HL2fttJU',
        // 'serviceWorkerRegistration':firebase
      }
      ).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', {err});
      // catch error while creating client token
    });
  }




















  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <NextNProgress color={'#2e3715'} />
    <ToastContainer />

    <Component {...pageProps} />
    </Provider>
    </QueryClientProvider>
  )
}

export default MyApp

setupInterceptors(store);