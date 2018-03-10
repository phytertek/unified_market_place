import {
  CREATE_FUNDRAISER_SUCCESS,
  CREATE_FUNDRAISER_ACCT_SUCCESS,
  GET_FUNDRAISERS_SUCCESS
} from './async';
const OPEN_FUNDRAISER_DRAWER = 'OPEN_FUNDRAISER_DRAWER';
export const openFundraiserDrawer = () => ({ type: OPEN_FUNDRAISER_DRAWER });
const CLOSE_FUNDRAISER_DRAWER = 'CLOSE_FUNDRAISER_DRAWER';
export const closeFundraiserDrawer = () => ({ type: CLOSE_FUNDRAISER_DRAWER });

const initState = {
  fundraiserDrawerOpen: false,
  fundraisers: []
};

const fundraiserStore = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_FUNDRAISERS_SUCCESS:
      return { ...state, fundraisers: payload.data };
    case CREATE_FUNDRAISER_ACCT_SUCCESS:
      return { ...state, fundraiserDrawerOpen: true };
    case CREATE_FUNDRAISER_SUCCESS:
      return { ...state, fundraisers: [...state.fundraisers, payload.data] };
    case OPEN_FUNDRAISER_DRAWER:
      return { ...state, fundraiserDrawerOpen: true };
    case CLOSE_FUNDRAISER_DRAWER:
      return { ...state, fundraiserDrawerOpen: false };
    default:
      return state;
  }
};

export default fundraiserStore;
