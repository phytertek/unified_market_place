import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Typography from 'material-ui/Typography';
const DisplayAmount = ({
  variant,
  align,
  gutterBottom,
  value,
  decimalScale = 2,
  fixedDecimalScale = true,
  thousandSeparator = true,
  prefix = '$',
  isNumericString
}) => {
  return (
    <Typography {...{ variant, align, gutterBottom }}>
      <NumberFormat
        {...{
          value,
          decimalScale,
          fixedDecimalScale,
          thousandSeparator,
          prefix,
          isNumericString
        }}
        displayType="text"
      />
    </Typography>
  );
};

DisplayAmount.prototypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default DisplayAmount;
