import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setupInterceptors from "../helpers/setUpInterceptor"
import { CookiesProvider } from "react-cookie";


function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <CookiesProvider>

    <ToastContainer />

    <Component {...pageProps} />
    </CookiesProvider>
    </Provider>
}

export default MyApp

setupInterceptors(store);