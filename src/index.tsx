import React from 'react';
import './styles/reset.css';
import ReactDOM from 'react-dom';
// Reset.css

// redux store
import { Provider } from 'react-redux';
// Theme
import { ThemeProvider } from 'styled-components';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';

import store from './redux/configureStore';
import theme from './styles/theme';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './shared/App';

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
