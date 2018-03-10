import React, { Component } from 'react';
import {
  PaymentRequestButtonElement,
  injectStripe
} from 'react-stripe-elements';

class PaymentRequestElement extends Component {
  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        paymentRequest={this.state.paymentRequest}
        style={{
          paymentRequestButton: {
            theme: 'dark',
            height: '64px',
            type: 'donate'
          }
        }}
      />
    ) : null;
  }
}
export default PaymentRequestElement;
