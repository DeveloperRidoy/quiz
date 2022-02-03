import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StateContext from '../context/StateContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
