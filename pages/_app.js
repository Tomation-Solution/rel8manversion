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
function MyApp({ Component, pageProps }) {
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