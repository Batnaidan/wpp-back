const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';

  if (!data.email) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.password) errors.password = 'Password field is required';

  if (!data.password2) errors.password2 = 'Confirm password field is required';

  if (data.password.length <= 6)
    errors.password = 'Password must be at least 6 characters';

  if (data.password !== data.password2)
    errors.password2 = 'Passwords must match';

  if (!data.first_name) errors.name = 'First name field is required';

  if (!data.first_name) errors.name = 'Last name field is required';

  return {
    errors,
    validation: isEmpty(errors),
  };
};
