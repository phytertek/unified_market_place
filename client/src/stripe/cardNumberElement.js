import React, { Component } from 'react';
import { CardNumberElement } from 'react-stripe-elements';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from './muiStripeInput';

const NumberPresentation = ({
  style,
  label,
  cardNumberEmpty,
  cardNumberFocused,
  cardNumberError,
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
        error={!!cardNumberError}
      >
        <InputLabel
          htmlFor="card-number"
          shrink={cardNumberFocused || !cardNumberEmpty}
          focused={cardNumberFocused}
        >
          {label ? label : 'Credit or Debit Card Number'}
        </InputLabel>
        <Input
          id="card-number"
          inputComponent={CardNumberElement}
          inputProps={{
            onFocus: () => cardFieldFocus('cardNumber'),
            onBlur: () => cardFieldBlur('cardNumber'),
            onChange: change => cardFieldChange(change),
            style: inputStyle
          }}
          isFocused={cardNumberFocused}
        />
        {!!cardNumberError && (
          <FormHelperText error>{cardNumberError}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

class NumberElement extends Component {
  state = {
    cardNumberEmpty: true,
    cardNumberFocused: false,
    cardNumberError: null
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
    return <NumberPresentation {...this.state} {...this} {...this.props} />;
  }
}

export default NumberElement;
