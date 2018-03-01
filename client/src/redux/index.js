import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reduxPromise from 'redux-promise';

// Import component reducers

export const history = createHistory();
const routerHistory = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(routerHistory, reduxPromise)(
  createStore
);
const combinedReducers = combineReducers({ routerReducer });
export const store =
  process.env.NODE_ENV === 'development'
    ? createStoreWithMiddleware(
        combinedReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStoreWithMiddleware(combinedReducers);
