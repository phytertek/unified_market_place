import React, { Component } from 'react';
import { CardCVCElement } from 'react-stripe-elements';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from './muiStripeInput';

const CVCPresentation = ({
  style,
  label,
  cardCVCEmpty,
  cardCVCFocused,
  cardCVCError,
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
        error={!!cardCVCError}
      >
        <InputLabel
          htmlFor="card-cvc"
          shrink={cardCVCFocused || !cardCVCEmpty}
          focused={cardCVCFocused}
        >
          {label ? label : 'Credit or Debit Card CVC'}
        </InputLabel>
        <Input
          id="card-cvc"
          inputComponent={CardCVCElement}
          inputProps={{
            onFocus: () => cardFieldFocus('cardCVC'),
            onBlur: () => cardFieldBlur('cardCVC'),
            onChange: change => cardFieldChange(change),
            style: inputStyle
          }}
          isFocused={cardCVCFocused}
        />
        {!!cardCVCError && (
          <FormHelperText error>{cardCVCError}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

class CVCElement extends Component {
  state = {
    cardCVCEmpty: true,
    cardCVCFocused: false,
    cardCVCError: null
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
    return <CVCPresentation {...this.state} {...this} {...this.props} />;
  }
}

export default CVCElement;
