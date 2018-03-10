// import isMobilePhone from 'validator/lib/isMobilePhone';
// import isPostalCode from 'validator/lib/isPostalCode';

const validatorFunctionName = fieldName =>
  `validate${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;

const fieldValidator = {
  validateFirstName: (firstName = '') => {
    let error;
    // if (!!!firstName) {
    //   error = 'First name is required';
    // }
    return !!error ? error : false;
  },
  validateLastName: (lastName = '') => {
    let error;
    // if (!!!lastName) {
    //   error = 'Last name is required';
    // }
    return !!error ? error : false;
  }
};

export const validateForm = (form, type) => {
  const errors = {};
  Object.keys(form).forEach(fieldName => {
    const error = fieldValidator[validatorFunctionName(fieldName)](
      form[fieldName],
      type
    );
    if (error) errors[`__${fieldName}Error`] = error;
  });
  return !!Object.keys(errors).length ? errors : false;
};
export const validateField = (field, type) => {
  const [fieldName, fieldValue] = Object.entries(field)[0];
  return fieldValidator[validatorFunctionName(fieldName)](fieldValue, type);
};
