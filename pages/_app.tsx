import React, { useEffect } from 'react';
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import '../styles/reset.css';

import AppLayout from '../components/AppLayout';


// store
import wrapper from '../redux/configureStore'
import theme from 'styles/theme';



function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme} >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  )
}


export default wrapper.withRedux(App);
