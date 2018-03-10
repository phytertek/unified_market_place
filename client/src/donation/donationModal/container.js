import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateDonationModalPresentation from './presentation';
import { closeDonationModal, addDonation } from '../store';

class CreateDonationModal extends Component {
  state = { amount: 10 };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };
  handleClose = () => {
    this.props.closeDonationModal();
    this.setState(() => ({ amount: 10 }));
  };
  handleSubmit = () => {
    this.props.addDonation({
      fundraiser: this.props.selectedFundraiser,
      amount: this.state.amount
    });
    this.props.closeDonationModal();
    this.setState(() => ({ amount: 10 }));
  };
  render() {
    return (
      <CreateDonationModalPresentation
        {...this.props}
        {...this.state}
        {...this}
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.donationStore });

export default connect(mapStateToProps, { closeDonationModal, addDonation })(
  CreateDonationModal
);
