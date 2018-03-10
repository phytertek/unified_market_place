import axios from 'axios';
import { push } from 'react-router-redux';

import { API } from '../host.json';

export const REGISTER = 'REGISTER';
export const REGISTER_SENT = 'REGISTER_SENT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const register = form => ({
  type: REGISTER,
  payload: form
});

export const LOGIN = 'LOGIN';
export const LOGIN_SENT = 'LOGIN_SENT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const login = form => ({
  type: LOGIN,
  payload: form
});

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SENT = 'LOGOUT_SENT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const logout = form => ({
  type: LOGOUT,
  payload: form
});

export const VALIDATE = 'VALIDATE';
const VALIDATE_ERROR = 'VALIDATE_ERROR';
export const validate = () => ({ type: VALIDATE });

export const AUTHENTICATING_START = 'AUTHENTICATING_START';
export const AUTHENTICATING_STOP = 'AUTHENTICATING_STOP';

export default store => next => async action => {
  next(action);
  const state = store.getState();
  const authHeader = { headers: { Authorization: state.authStore.token } };
  switch (action.type) {
    case VALIDATE:
      try {
        next({ type: AUTHENTICATING_START });
        await axios.get(`${API}/auth/validate`, authHeader);
        next({ type: AUTHENTICATING_STOP });
      } catch (error) {
        next({ type: VALIDATE_ERROR, payload: error });
        next({ type: AUTHENTICATING_STOP });
        next({ type: LOGOUT_SENT });
        store.dispatch(push('/'));
      }
      break;
    case REGISTER:
      try {
        next({ type: REGISTER_SENT });
        next({ type: AUTHENTICATING_START });
        const response = await axios.post(
          `${API}/auth/register`,
          action.payload
        );
        next({ type: REGISTER_SUCCESS, payload: response });
        next({ type: AUTHENTICATING_STOP });
      } catch (error) {
        next({ type: REGISTER_ERROR, payload: error });
        next({ type: AUTHENTICATING_STOP });
        store.dispatch(push('/'));
      }
      break;
    case LOGIN:
      try {
        next({ type: LOGIN_SENT });
        next({ type: AUTHENTICATING_START });
        const response = await axios.post(`${API}/auth/login`, action.payload);
        next({ type: LOGIN_SUCCESS, payload: response });
        next({ type: AUTHENTICATING_STOP });
      } catch (error) {
        next({ type: LOGIN_ERROR, payload: error });
        next({ type: AUTHENTICATING_STOP });
        store.dispatch(push('/'));
      }
      break;
    case LOGOUT:
      try {
        next({ type: LOGOUT_SENT });
        next({ type: AUTHENTICATING_START });
        window.localStorage.removeItem('auth');
        const response = await axios.get(`${API}/auth/logout`, authHeader);
        next({ type: LOGOUT_SUCCESS, payload: response });
        next({ type: AUTHENTICATING_STOP });
      } catch (error) {
        next({ type: LOGOUT_ERROR, payload: error });
        next({ type: AUTHENTICATING_STOP });
        store.dispatch(push('/'));
      }
      break;
    default:
      break;
  }
};
