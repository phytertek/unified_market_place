import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SENT,
  AUTHENTICATING_START,
  AUTHENTICATING_STOP
} from './async';

import { CREATE_FUNDRAISER_ACCT_SUCCESS } from '../fundraiser/async';
import { CREATE_DONATION_SUCCESS } from '../donation/async';

const OPEN_REGISTRATION_LOGIN_DRAWER = 'OPEN_REGISTRATION_LOGIN_DRAWER';
export const openRegistrationLoginDrawer = type => ({
  type: OPEN_REGISTRATION_LOGIN_DRAWER,
  payload: type
});
const CLOSE_REGISTRATION_LOGIN_DRAWER = 'CLOSE_REGISTRATION_LOGIN_DRAWER';
export const closeRegistrationLoginDrawer = () => ({
  type: CLOSE_REGISTRATION_LOGIN_DRAWER
});

const AUTH_FROM_STORAGE = 'AUTH_FROM_STORAGE';
export const authFromStorage = auth => ({
  type: AUTH_FROM_STORAGE,
  payload: auth
});

const initState = {
  token: '',
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  isDonor: false,
  isFundraiser: false,
  isAuth: false,
  authenticating: false,
  registrationLoginDrawerOpen: false,
  registrationLoginType: null
};

const localStore = JSON.parse(window.localStorage.getItem('auth'));
if (!!localStore && localStore.isAuth && !!localStore.token) {
  Object.keys(localStore).forEach(prop => (initState[prop] = localStore[prop]));
}

const authStore = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case CREATE_DONATION_SUCCESS:
      return { ...state, isDonor: payload.data.isDonor };
    case CREATE_FUNDRAISER_ACCT_SUCCESS:
      return { ...state, isFundraiser: true };
    case OPEN_REGISTRATION_LOGIN_DRAWER:
      return {
        ...state,
        registrationLoginDrawerOpen: true,
        registrationLoginType: payload
      };
    case CLOSE_REGISTRATION_LOGIN_DRAWER:
      return {
        ...state,
        registrationLoginDrawerOpen: false,
        registrationLoginType: null
      };
    case AUTH_FROM_STORAGE:
      return { ...state, ...payload };
    case AUTHENTICATING_START:
      return { ...state, authenticating: true };
    case AUTHENTICATING_STOP:
      return { ...state, authenticating: false };
    case REGISTER_SUCCESS:
      return { ...state, isAuth: true, ...payload.data };
    case REGISTER_ERROR:
      return { ...state, registrationLoginDrawerOpen: true };
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, ...payload.data };
    case LOGIN_ERROR:
      return { ...state, registrationLoginDrawerOpen: true };
    case LOGOUT_SENT:
      return {
        token: '',
        email: '',
        isAuth: false,
        authenticating: false,
        registrationLoginDrawerOpen: false,
        registrationLoginType: null
      };
    default:
      return state;
  }
};

export default authStore;
