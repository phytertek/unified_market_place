import React, { Component } from 'react';
import { CardElement } from 'react-stripe-elements';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from './muiStripeInput';

const CardPresentation = ({
  style,
  label,
  cardEmpty,
  cardFocused,
  cardError,
  cardFieldBlur,
  cardFieldFocus,
  cardFieldChange
}) => {
  const inputStyle = {
    base: {
      iconColor: cardFocused || !cardEmpty ? '#fff' : 'transparent',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color:
          cardFocused || !cardEmpty ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
      }
    },
    invalid: { color: 'white' }
  };
  return (
    <div>
      <FormControl
        style={style ? style : { width: '100%' }}
        error={!!cardError}
      >
        <InputLabel
          htmlFor="card"
          shrink={cardFocused || !cardEmpty}
          focused={cardFocused}
        >
          {label ? label : 'Credit or Debit Card'}
        </InputLabel>
        <Input
          id="card"
          inputComponent={CardElement}
          inputProps={{
            onFocus: () => cardFieldFocus('card'),
            onBlur: () => cardFieldBlur('card'),
            onChange: change => cardFieldChange(change),
            style: inputStyle
          }}
          isFocused={cardFocused}
        />
        {!!cardError && <FormHelperText error>{cardError}</FormHelperText>}
      </FormControl>
    </div>
  );
};

class AIOCardElement extends Component {
  state = {
    cardEmpty: true,
    cardFocused: false,
    cardError: null
  };
  cardFieldChange = change => {
    const field = change.elementType;
    const newState = {
      [`${field}Empty`]: change.empty,
      [`${field}Error`]: !!change.error ? change.error.message : null
    };
    if (this.props.isEmpty) this.props.isEmpty(change.empty);
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
    return <CardPresentation {...this.state} {...this} {...this.props} />;
  }
}

export default AIOCardElement;
