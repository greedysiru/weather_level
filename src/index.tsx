import React from 'react';
import ReactDOM from 'react-dom';
// Reset.css
import './styles/reset.css';
// redux store
import { Provider } from 'react-redux';
// Theme
import { ThemeProvider } from 'styled-components';

import store from './redux/configureStore';
import theme from './styles/theme';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './shared/App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
