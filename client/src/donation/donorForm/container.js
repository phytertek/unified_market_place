import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { createDonation } from '../async';
import CreateDonorFormPresentation from './presentation';
import { validateField, validateForm } from './validation';
import { closeCheckoutDrawer } from '../../donation/store';

class CreateDonorForm extends Component {
  state = {
    firstName: '',
    __firstNameError: '',
    lastName: '',
    __lastNameError: '',
    __cardFieldSelected: false,
    __cardFieldEmpty: true,
    __token: null,
    __manualEntry: false
  };
  setToken = (token, stripe) => {
    this.setState({ __token: token });
    this.submitHandler(stripe);
  };
  setManualEntry = () => {
    this.setState(() => ({ __manualEntry: true }));
  };
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      [name]: value,
      [`__${name}Error`]: validateField({ [name]: value })
    }));
  };
  submitHandler = async stripe => {
    try {
      const submitFields = Object.keys(this.state).reduce(
        (returnedFields, fieldName) => {
          if (!fieldName.startsWith('__'))
            returnedFields[fieldName] = this.state[fieldName];
          return returnedFields;
        },
        {}
      );
      const formErrors = validateForm(submitFields);
      if (!!formErrors) return this.setState(() => formErrors);
      if (!this.state.__token) {
        const { token, error } = await stripe.createToken({
          name: `${submitFields.firstName} ${submitFields.lastName}`
        });
        if (error) throw new Error(error);
        submitFields.token = token;
      } else submitFields.token = this.state.__token;
      this.props.createDonation(submitFields);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Elements>
        <CreateDonorFormPresentation
          {...this.state}
          submitting={this.props.submitting}
          pendingTotal={this.props.pendingTotal}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          setManualEntry={this.setManualEntry}
          setToken={this.setToken}
        />
      </Elements>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.donationStore.submitting,
  pendingTotal: state.donationStore.pendingDonations.reduce(
    (t, d) => t + Number(d.amount),
    0
  )
});

const mapDispatchToProps = {
  createDonation,
  closeCheckoutDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonorForm);
