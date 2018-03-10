import React, { Component } from 'react';
import { PostalCodeElement } from 'react-stripe-elements';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from './muiStripeInput';

const PostalCodePresentation = ({
  style,
  label,
  cardPostalCodeEmpty,
  cardPostalCodeFocused,
  cardPostalCodeError,
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
        error={!!cardPostalCodeError}
      >
        <InputLabel
          htmlFor="card-cvc"
          shrink={cardPostalCodeFocused || !cardPostalCodeEmpty}
          focused={cardPostalCodeFocused}
        >
          {label ? label : 'Credit or Debit Card Postal Code'}
        </InputLabel>
        <Input
          id="card-cvc"
          inputComponent={PostalCodeElement}
          inputProps={{
            onFocus: () => cardFieldFocus('cardPostalCode'),
            onBlur: () => cardFieldBlur('cardPostalCode'),
            onChange: change => cardFieldChange(change),
            style: inputStyle
          }}
          isFocused={cardPostalCodeFocused}
        />
        {!!cardPostalCodeError && (
          <FormHelperText error>{cardPostalCodeError}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

class PostalCodeElement extends Component {
  state = {
    cardPostalCodeEmpty: true,
    cardPostalCodeFocused: false,
    cardPostalCodeError: null
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
    return <PostalCodePresentation {...this.state} {...this} {...this.props} />;
  }
}

export default PostalCodeElement;
