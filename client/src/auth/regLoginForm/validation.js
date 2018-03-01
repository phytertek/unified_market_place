import isEmail from 'validator/lib/isEmail';
import passwordStrengthTest from 'owasp-password-strength-test';

const validatorFunctionName = fieldName =>
  `validate${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;

const fieldValidator = {
  validateEmail: (email = '') => {
    console.log(email);
    let error;
    if (!!email && !isEmail(email)) {
      error = 'Must be a valid email address (username@domain.com)';
    }
    if (!!!email) {
      error = 'Email address is required';
    }
    console.log(error);
    return !!error ? error : false;
  },
  validatePassword: (password = '', type) => {
    let error;
    if (type === 'registration' && !!password) {
      passwordStrengthTest.config({
        allowPassphrases: true,
        maxLength: 56,
        minLength: 8,
        minPhraseLength: 16,
        minOptionalTestsToPass: 4
      });
      const passwordTestResults = passwordStrengthTest.test(password);
      if (passwordTestResults.optionalTestErrors.length > 0) {
        error = passwordTestResults.optionalTestErrors[0];
      }
      if (passwordTestResults.requiredTestErrors.length > 0) {
        error = passwordTestResults.requiredTestErrors[0];
      }
    }
    if (!!!password) {
      error = 'Password is required';
    }
    return !!error ? error : false;
  }
};
export const validateForm = (form, type) => {
  const errors = {};
  ['email', 'password'].forEach(fieldName => {
    const error = fieldValidator[validatorFunctionName(fieldName)](
      form[fieldName],
      type
    );
    if (error) errors[`${fieldName}Error`] = error;
  });
  return !!Object.keys(errors).length ? errors : false;
};
export const validateField = field => {
  const [keyVal] = Object.entries(field);
  const [fieldName, fieldValue] = keyVal;
  console.log(fieldValidator[validatorFunctionName(fieldName)](fieldValue));
  return fieldValidator[validatorFunctionName(fieldName)](fieldValue);
};
