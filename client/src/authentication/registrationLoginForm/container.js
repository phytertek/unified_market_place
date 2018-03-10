import React, { Component } from 'react';
import { validateForm, validateField } from './validation';

import RegistrationLoginFormPresentation from './presentation';

class RegistrationLoginForm extends Component {
  state = {
    email: '',
    password: '',
    __emailError: false,
    __passwordError: false,
    __showPassword: false
  };

  visiblePasswordHandler = () => {
    this.setState(() => ({ __showPassword: !this.state.__showPassword }));
  };
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
      [`__${name}Error`]: validateField({ [name]: value }, this.props.type)
    }));
  };
  submitHandler = () => {
    const submitFields = Object.keys(this.state).reduce(
      (returnedFields, fieldName) => {
        if (!fieldName.startsWith('__'))
          returnedFields[fieldName] = this.state[fieldName];
        return returnedFields;
      },
      {}
    );
    const formErrors = validateForm(submitFields, this.props.type);
    if (!!formErrors) return this.setState(() => formErrors);
    this.props.submit(submitFields);
    this.props.closeRegistrationLoginDrawer();
  };

  render() {
    return (
      <RegistrationLoginFormPresentation
        {...this.state}
        type={this.props.type}
        authenticating={this.props.authenticating}
        visiblePasswordHandler={this.visiblePasswordHandler}
        changeHandler={this.changeHandler}
        submitHandler={this.submitHandler}
        openRegistrationLoginDrawer={this.props.openRegistrationLoginDrawer}
      />
    );
  }
}

export default RegistrationLoginForm;
