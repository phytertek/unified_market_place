import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reduxPromise from 'redux-promise';

import authStore from '../authentication/store';
import authAsync from '../authentication/async';
import donationStore from '../donation/store';
import donationAsync from '../donation/async';
import fundraiserStore from '../fundraiser/store';
import fundraiserAsync from '../fundraiser/async';

export const history = createHistory();
const routerHistory = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(
  authAsync,
  donationAsync,
  fundraiserAsync,
  routerHistory,
  reduxPromise
)(createStore);
const combinedReducers = combineReducers({
  authStore,
  donationStore,
  fundraiserStore,
  routerReducer
});
export const store =
  process.env.NODE_ENV === 'development'
    ? createStoreWithMiddleware(
        combinedReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStoreWithMiddleware(combinedReducers);
