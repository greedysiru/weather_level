import React from 'react';
import { AppProps } from 'next/app'

import '../styles/reset.css';

// store
import wrapper from '../redux/configureStore'

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <h1>리액트</h1>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default wrapper.withRedux(App);
