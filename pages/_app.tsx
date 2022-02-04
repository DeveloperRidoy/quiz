import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StateContext from '../hoc/context/StateContext'
import Layout from '../hoc/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
