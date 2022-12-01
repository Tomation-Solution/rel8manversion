import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setupInterceptors from "../helpers/setUpInterceptor"

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <ToastContainer />

    <Component {...pageProps} />
    </Provider>
}

export default MyApp

setupInterceptors(store);