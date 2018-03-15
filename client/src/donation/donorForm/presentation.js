import React, { Component } from 'react';
import { PaymentRequestButtonElement } from 'react-stripe-elements';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { injectStripe } from 'react-stripe-elements';
import CardForm from '../../stripe/cardElement';
import NumberFormat from 'react-number-format';

class CreateDonorFormPresentation extends Component {
  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Donation total',
        amount: props.pendingTotal * 100
      }
    });

    paymentRequest.canMakePayment().then(result => {
      if (!result) this.props.setManualEntry();
      this.setState({
        showPaymentRequestButton: !!result
      });
    });
    paymentRequest.on('token', ev => {
      props.setToken(ev.token, props.stripe);
      this.setState({ tokenRecieved: true });
      ev.complete('success');
    });

    this.state = {
      showPaymentRequestButton: false,
      tokenRecieved: false,
      paymentRequest,
      paymentReqChosen: false
    };
  }
  componentWillReceiveProps(next) {
    if (this.props.pendingTotal !== next.pendingTotal) {
      this.state.paymentRequest.update({
        total: {
          label: 'Donation total',
          amount: next.pendingTotal * 100
        }
      });
    }
  }
  selectPaymentRequest = () =>
    this.setState(() => ({ paymentReqChosen: true }));
  render() {
    const {
      firstName,
      __firstNameError,
      lastName,
      __lastNameError,
      __manualEntry,
      changeHandler,
      submitHandler,
      setManualEntry,
      submitting,
      stripe,
      pendingTotal
    } = this.props;
    const {
      showPaymentRequestButton,
      paymentRequest,
      paymentReqChosen,
      tokenRecieved
    } = this.state;
    return (
      <div style={{ width: 400 }}>
        {!__manualEntry &&
          !submitting &&
          !paymentReqChosen && (
            <Button
              variant="raised"
              color="primary"
              onClick={setManualEntry}
              style={{ width: '100%', padding: 20 }}
            >
              <Typography variant="title">Checkout with new card</Typography>
            </Button>
          )}
        {showPaymentRequestButton &&
          !submitting &&
          !tokenRecieved &&
          !__manualEntry && (
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <PaymentRequestButtonElement
                onClick={this.selectPaymentRequest}
                paymentRequest={paymentRequest}
                style={{
                  paymentRequestButton: {
                    theme: 'light-outline',
                    height: '64px'
                  }
                }}
              />
            </div>
          )}
        {!paymentReqChosen &&
          !submitting &&
          __manualEntry && (
            <div>
              <div style={{ padding: 20 }}>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      value={firstName}
                      error={!!__firstNameError}
                      helperText={__firstNameError}
                      onChange={changeHandler}
                      name="firstName"
                      label="First Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={lastName}
                      error={!!__lastNameError}
                      helperText={__lastNameError}
                      onChange={changeHandler}
                      name="lastName"
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                  {!tokenRecieved && (
                    <Grid item>
                      <CardForm />
                    </Grid>
                  )}
                </Grid>
              </div>
              <Button
                variant="raised"
                color="primary"
                onClick={() => submitHandler(stripe)}
                style={{ width: '100%', padding: 20 }}
              >
                <Typography variant="title">
                  Donate{' '}
                  {pendingTotal && (
                    <NumberFormat
                      value={pendingTotal}
                      isNumericString={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandSeparator
                      displayType="text"
                      prefix="$"
                    />
                  )}
                </Typography>
              </Button>
            </div>
          )}
        {submitting && <LinearProgress />}
      </div>
    );
  }
}

export default injectStripe(CreateDonorFormPresentation);
