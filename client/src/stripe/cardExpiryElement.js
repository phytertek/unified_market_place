import React, { Component } from 'react';
import {
  Elements,
  injectStripe,
  CardExpiryElement
} from 'react-stripe-elements';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from './muiStripeInput';

const _ExpiryPresentation = ({
  style,
  label,
  cardExpiryEmpty,
  cardExpiryFocused,
  cardExpiryError,
  cardFieldBlur,
  cardFieldFocus,
  cardFieldChange
}) => {
  const inputStyle = {
    base: {
      color: '#fff',
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: 'transparent' }
    },
    invalid: { color: 'white' }
  };
  return (
    <div>
      <FormControl
        style={style ? style : { width: '100%' }}
        error={!!cardExpiryError}
      >
        <InputLabel
          htmlFor="card-expiry"
          shrink={cardExpiryFocused || !cardExpiryEmpty}
          focused={cardExpiryFocused}
        >
          {label ? label : 'Credit or Debit Card Expiry'}
        </InputLabel>
        <Input
          id="card-expiry"
          inputComponent={CardExpiryElement}
          inputProps={{
            onFocus: () => cardFieldFocus('cardExpiry'),
            onBlur: () => cardFieldBlur('cardExpiry'),
            onChange: change => cardFieldChange(change),
            style: inputStyle
          }}
          isFocused={cardExpiryFocused}
        />
        {!!cardExpiryError && (
          <FormHelperText error>{cardExpiryError}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

const ExpiryPresentation = injectStripe(_ExpiryPresentation);

class ExpiryElement extends Component {
  state = {
    cardExpiryEmpty: true,
    cardExpiryFocused: false,
    cardExpiryError: null
  };
  cardFieldChange = change => {
    const field = change.elementType;
    const newState = {
      [`${field}Empty`]: change.empty,
      [`${field}Error`]: !!change.error ? change.error.message : null
    };
    this.setState(() => newState);
  };
  cardFieldFocus = field => {
    this.setState(() => ({
      [`${field}Focused`]: true
    }));
  };
  cardFieldBlur = field => {
    this.setState(() => ({
      [`${field}Focused`]: false
    }));
  };
  render() {
    const { component: Component } = this.props;
    return (
      <Elements>
        <ExpiryPresentation {...this.state} {...this} {...this.props} />
      </Elements>
    );
  }
}

export default ExpiryElement;
