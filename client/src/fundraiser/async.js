import axios from 'axios';
import { push } from 'react-router-redux';

import { API } from '../host.json';

export const GET_FUNDRAISERS = 'GET_FUNDRAISERS';
export const GET_FUNDRAISERS_SENT = 'GET_FUNDRAISERS_SENT';
export const GET_FUNDRAISERS_SUCCESS = 'GET_FUNDRAISERS_SUCCESS';
export const GET_FUNDRAISERS_ERROR = 'GET_FUNDRAISERS_ERROR';
export const getFundraisers = () => ({ type: GET_FUNDRAISERS });

const OPEN_FUNDRAISER_DRAWER_REDIRECT = 'OPEN_FUNDRAISER_DRAWER_REDIRECT';
export const openFundraiserDrawerRedirect = () => ({
  type: OPEN_FUNDRAISER_DRAWER_REDIRECT
});

export const CREATE_FUNDRAISER = 'CREATE_FUNDRAISER';
export const CREATE_FUNDRAISER_SENT = 'CREATE_FUNDRAISER_SENT';
export const CREATE_FUNDRAISER_SUCCESS = 'CREATE_FUNDRAISER_SUCCESS';
export const CREATE_FUNDRAISER_ERROR = 'CREATE_FUNDRAISER_ERROR';
export const createFundraiser = form => ({
  type: CREATE_FUNDRAISER,
  payload: form
});

export const CREATE_FUNDRAISER_ACCT_SENT = 'CREATE_FUNDRAISER_ACCT_SENT';
export const CREATE_FUNDRAISER_ACCT_SUCCESS = 'CREATE_FUNDRAISER_ACCT_SUCCESS';
export const CREATE_FUNDRAISER_ACCT_ERROR = 'CREATE_FUNDRAISER_ACCT_ERROR';

const getURLParam = (param, str) => {
  param = param + '=';
  const paramIndex = str.indexOf(param);
  let paramDelimiter = str.indexOf('&', paramIndex);
  if (paramDelimiter === -1) paramDelimiter = undefined;
  return str.slice(paramIndex, paramDelimiter).replace(param, '');
};

export default store => next => async action => {
  next(action);
  const state = store.getState();
  const authHeader = { headers: { Authorization: state.authStore.token } };
  switch (action.type) {
    case GET_FUNDRAISERS:
      try {
        next({ type: GET_FUNDRAISERS_SENT });
        const response = await axios.get(`${API}/fundraiser/all`);
        next({ type: GET_FUNDRAISERS_SUCCESS, payload: response });
      } catch (error) {
        next({ type: GET_FUNDRAISERS_ERROR, payload: error });
      }
      break;
    case OPEN_FUNDRAISER_DRAWER_REDIRECT:
      try {
        const code = getURLParam('code', state.routerReducer.location.search);
        next({ type: CREATE_FUNDRAISER_ACCT_SENT });
        const response = await axios.post(
          `${API}/fundraiser/create-acct`,
          { code },
          authHeader
        );
        next({
          type: CREATE_FUNDRAISER_ACCT_SUCCESS,
          payload: response
        });
        store.dispatch(push('/'));
      } catch (error) {
        next({ type: CREATE_FUNDRAISER_ACCT_ERROR, payload: error });
      }
      break;
    case CREATE_FUNDRAISER:
      try {
        next({ type: CREATE_FUNDRAISER_SENT });
        const response = await axios.post(
          `${API}/fundraiser/create`,
          action.payload,
          authHeader
        );
        next({
          type: CREATE_FUNDRAISER_SUCCESS,
          payload: response
        });
      } catch (error) {
        next({ type: CREATE_FUNDRAISER_ERROR, payload: error });
      }
      break;
    default:
      break;
  }
};
