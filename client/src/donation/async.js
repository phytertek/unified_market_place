import axios from 'axios';
import { API } from '../host.json';

export const CREATE_DONATION = 'CREATE_DONATION';
export const CREATE_DONATION_SENT = 'CREATE_DONATION_SENT';
export const CREATE_DONATION_SUCCESS = 'CREATE_DONATION_SUCCESS';
export const CREATE_DONATION_ERROR = 'CREATE_DONATION_ERROR';
export const createDonation = form => ({
  type: CREATE_DONATION,
  payload: form
});

export const SUBMITTING_START = 'SUBMITTING_START';
export const SUBMITTING_STOP = 'SUBMITTING_STOP';

export default store => next => async action => {
  next(action);
  const state = store.getState();
  const authHeader = { headers: { Authorization: state.authStore.token } };
  switch (action.type) {
    case CREATE_DONATION:
      try {
        next({ type: CREATE_DONATION_SENT });
        next({ type: SUBMITTING_START });
        action.payload.donations = state.donationStore.pendingDonations;
        const result = await axios.post(
          `${API}/donation/create`,
          action.payload,
          authHeader
        );
        next({ type: CREATE_DONATION_SUCCESS, payload: result });
        next({ type: SUBMITTING_STOP });
      } catch (error) {
        next({ type: CREATE_DONATION_ERROR, payload: error });
        console.log(error.response.data.message);
        console.log(error.response.data.stack);
        next({ type: SUBMITTING_STOP });
      }
      break;
    default:
      break;
  }
};
