import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../hoc/Layout'
import StateContext from '../hoc/context/StateContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
   </StateContext>
  )
}

export default MyApp

