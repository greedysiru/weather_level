import React, { useEffect } from 'react';
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import '../styles/reset.css';


// store
import wrapper from '../redux/configureStore'
import theme from 'styles/theme';

import { weatherAPI } from '../shared/api';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = async () => {
    console.log('getWeather')
    const res = await weatherAPI.getWeather(37.6027, 126.9291)
    console.log(res.data)
  }
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
