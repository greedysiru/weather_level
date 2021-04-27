import { AppProps } from 'next/app'

import '../styles/reset.css';

// store
import wrapper from '../redux/configureStore'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1>리액트</h1>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);
