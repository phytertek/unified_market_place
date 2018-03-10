import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
export function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is dirty (a.k.a. filled).
//
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
export function isDirty(obj, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
export function isAdornedStart(obj) {
  return obj.startAdornment;
}

export const styles = theme => {
  const light = theme.palette.type === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: 0
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  const bottomLineColor = light
    ? 'rgba(0, 0, 0, 0.42)'
    : 'rgba(255, 255, 255, 0.7)';

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: light ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '1.1875em' // Reset (19px), match the native input line-height
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2
      }
    },
    focused: {},
    disabled: {
      color: theme.palette.text.disabled
    },
    underline: {
      '&:after': {
        backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      },
      '&:before': {
        backgroundColor: bottomLineColor,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: `linear-gradient(to right, ${bottomLineColor} 33%, transparent 0%)`,
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    multiline: {
      padding: `${theme.spacing.unit - 2}px 0 ${theme.spacing.unit - 1}px`
    },
    fullWidth: {
      width: '100%'
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      padding: `${theme.spacing.unit - 2}px 0 ${theme.spacing.unit - 1}px`,
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        '-webkit-appearance': 'none'
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden, // IE 11
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible // Edge
      }
    },
    inputMarginDense: {
      paddingTop: theme.spacing.unit / 2 - 1
    },
    inputDisabled: {
      opacity: 1 // Reset iOS opacity
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    inputType: {
      // type="date" or type="time", etc. have specific styles we need to reset.
      height: '1.1875em' // Reset (19px), match the native input line-height
    },
    inputTypeSearch: {
      // Improve type search style.
      '-moz-appearance': 'textfield',
      '-webkit-appearance': 'textfield'
    }
  };
};

function formControlState(props, context) {
  let disabled = props.disabled;
  let error = props.error;
  let margin = props.margin;

  if (context && context.muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = context.muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = context.muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = context.muiFormControl.margin;
    }
  }

  return {
    disabled,
    error,
    margin
  };
}

class Input extends React.Component {
  state = {
    focused: false
  };

  componentWillReceiveProps(next) {
    // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.

    if (
      (!this.props.isFocused && next.isFocused) ||
      (this.props.isFocused && !next.isFocused)
    ) {
      this.setState(state => ({ focused: !state.focused }));
    }
  }
  // Holds the input reference
  input = null;

  render() {
    const {
      autoComplete,
      autoFocus,
      classes,
      className: classNameProp,
      defaultValue,
      disabled: disabledProp,
      disableUnderline,
      endAdornment,
      error: errorProp,
      fullWidth,
      id,
      inputComponent,
      inputProps: { className: inputPropsClassName, ...inputPropsProp } = {},
      inputRef,
      margin: marginProp,
      multiline,
      name,
      onBlur,
      onChange,
      onClean,
      onDirty,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      rows,
      rowsMax,
      startAdornment,
      type,
      value,
      ...other
    } = this.props;

    const { muiFormControl } = this.context;
    const { disabled, error, margin } = formControlState(
      this.props,
      this.context
    );

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.fullWidth]: fullWidth,
        [classes.focused]: this.state.focused,
        [classes.formControl]: muiFormControl,
        [classes.underline]: !disableUnderline
      },
      classNameProp
    );

    const inputClassName = classNames(
      classes.input,
      {
        [classes.inputDisabled]: disabled,
        [classes.inputMarginDense]: margin === 'dense'
      },
      inputPropsClassName
    );

    let InputComponent = 'input';
    let inputProps = {
      ...inputPropsProp
      // ref: this.handleRefInput
    };

    if (inputComponent) {
      InputComponent = inputComponent;
      inputProps = {
        // Rename ref to inputRef as we don't know the
        // provided `inputComponent` structure.
        ...inputProps,
        ref: null
      };
    }

    return (
      <div className={className} {...other}>
        {startAdornment}
        <InputComponent
          className={inputClassName}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          value={value}
          {...inputProps}
        />
        {endAdornment}
      </div>
    );
  }
}

Input.defaultProps = {
  disableUnderline: false,
  fullWidth: false,
  multiline: false,
  type: 'text'
};

Input.contextTypes = {
  muiFormControl: PropTypes.object
};

export default withStyles(styles)(Input);
