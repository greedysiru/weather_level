import React from 'react';
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import '../styles/reset.css';


// store
import wrapper from '../redux/configureStore'
import theme from 'styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme} >
      <React.Fragment>
        <h1>리액트</h1>
        <Component {...pageProps} />      
      </React.Fragment>
    </ThemeProvider>
  )
}


export default wrapper.withRedux(App);
