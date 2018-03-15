import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function AmountField(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      isNumericString={true}
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      thousandSeparator
      prefix="$"
    />
  );
}

AmountField.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AmountField;
