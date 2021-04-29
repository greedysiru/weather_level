import React, { useEffect } from 'react';
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import '../styles/reset.css';
import styled from 'styled-components';

// store
import wrapper from '../redux/configureStore'
import theme from 'styles/theme';



function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme} >
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    </ThemeProvider>
  )
}



export default wrapper.withRedux(App);
