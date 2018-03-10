import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { StripeProvider } from 'react-stripe-elements';

import { store, history } from './redux';
import theme from './theme';
import App from './App';

// Render app
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <StripeProvider apiKey="pk_test_WAcqNg9QaFF8gKhchVi9fQx6">
          <App />
        </StripeProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
