import {
  SUBMITTING_START,
  SUBMITTING_STOP,
  CREATE_DONATION_SUCCESS
} from './async';

export const ADD_DONATION = 'ADD_DONATION';
export const addDonation = donation => ({
  type: ADD_DONATION,
  payload: donation
});
export const REMOVE_DONATION = 'REMOVE_DONATION';
export const removeDonation = index => ({
  type: REMOVE_DONATION,
  payload: index
});

export const UPDATE_DONATION = 'UPDATE_DONATION';
export const updateDonation = ({ index, amount }) => ({
  type: UPDATE_DONATION,
  payload: { index, amount }
});

export const CHECKOUT_DRAWER_OPEN = 'CHECKOUT_DRAWER_OPEN';
export const openCheckoutDrawer = () => ({ type: CHECKOUT_DRAWER_OPEN });

export const CHECKOUT_DRAWER_CLOSE = 'CHECKOUT_DRAWER_CLOSE';
export const closeCheckoutDrawer = () => ({ type: CHECKOUT_DRAWER_CLOSE });

export const DONATION_MODAL_OPEN = 'DONATION_MODAL_OPEN';
export const openDonationModal = fundraiser => ({
  type: DONATION_MODAL_OPEN,
  payload: fundraiser
});
export const DONATION_MODAL_CLOSE = 'DONATION_MODAL_CLOSE';
export const closeDonationModal = () => ({
  type: DONATION_MODAL_CLOSE
});

export const CHECKOUT_SUCCESS_MODAL_CLOSE = 'CHECKOUT_SUCCESS_MODAL_CLOSE';
export const closeCheckoutSuccessModal = () => ({
  type: CHECKOUT_SUCCESS_MODAL_CLOSE
});

const initState = {
  checkoutDrawerOpen: false,
  checkoutSuccessModalOpen: false,
  checkoutSuccessTotal: 0,
  donationModalOpen: false,
  selectedFundraiser: null,
  pendingDonations: [],
  submitting: false
};
export default (state = initState, { type, payload }) => {
  switch (type) {
    case CHECKOUT_SUCCESS_MODAL_CLOSE:
      return {
        ...state,
        checkoutSuccessModalOpen: false,
        checkoutSuccessTotal: 0
      };
    case CREATE_DONATION_SUCCESS:
      return {
        ...state,
        checkoutDrawerOpen: false,
        checkoutSuccessModalOpen: true,
        checkoutSuccessTotal: payload.data.donationsTotal,
        pendingDonations: []
      };
    case SUBMITTING_START:
      return { ...state, submitting: true };
    case SUBMITTING_STOP:
      return { ...state, submitting: false };
    case UPDATE_DONATION:
      const updatedDonations = [...state.pendingDonations];
      const donation = updatedDonations.splice(payload.index, 1)[0];
      donation.amount = payload.amount;
      updatedDonations.splice(payload.index, 0, donation);
      return { ...state, pendingDonations: updatedDonations };
    case ADD_DONATION:
      return {
        ...state,
        pendingDonations: [...state.pendingDonations, payload]
      };
    case REMOVE_DONATION:
      const pendingDonations = [...state.pendingDonations];
      pendingDonations.splice(payload, 1);
      return { ...state, pendingDonations };
    case CHECKOUT_DRAWER_OPEN:
      return { ...state, checkoutDrawerOpen: true };
    case CHECKOUT_DRAWER_CLOSE:
      return { ...state, checkoutDrawerOpen: false };
    case DONATION_MODAL_OPEN:
      return { ...state, donationModalOpen: true, selectedFundraiser: payload };
    case DONATION_MODAL_CLOSE:
      return { ...state, donationModalOpen: false, selectedFundraiser: null };
    default:
      return state;
  }
};
