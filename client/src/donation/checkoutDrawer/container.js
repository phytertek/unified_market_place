import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutDrawerPresentation from './presentation';
import { closeCheckoutDrawer, removeDonation, updateDonation } from '../store';
import { openRegistrationLoginDrawer } from '../../authentication/store';

class CheckoutDrawer extends Component {
  state = { showDonorForm: false, inCheckout: false };
  componentWillReceiveProps(next) {
    if (
      (this.props.pendingDonations.length && !next.pendingDonations.length) ||
      (this.props.checkoutDrawerOpen && !next.checkoutDrawerOpen)
    ) {
      this.setState({ inCheckout: false });
    }
  }
  handleRemove = index => this.props.removeDonation(index);
  handleChange = ({ index, amount }) =>
    this.props.updateDonation({ index, amount });
  handleStartCheckout = () => {
    const newState = { inCheckout: true };
    if (!this.props.isCustomer) newState.showDonorForm = true;
    if (!this.state.inCheckout && !this.props.isAuth)
      this.props.openRegistrationLoginDrawer('login');
    this.setState(() => newState);
  };
  render() {
    return (
      <CheckoutDrawerPresentation {...this.props} {...this.state} {...this} />
    );
  }
}

const mapStateToProps = state => ({
  ...state.donationStore,
  ...state.authStore
});
const mapDispatchToProps = {
  closeCheckoutDrawer,
  updateDonation,
  removeDonation,
  openRegistrationLoginDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDrawer);
