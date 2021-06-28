const Validator = require('validator');
const isEmpty = require('is-empty');

const validateLoginInput = (data) => {
  console.log(data);
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) errors.email = 'email field is required';

  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required';
  return {
    errors,
    validation: isEmpty(errors),
  };
};

const validateLoginAuthInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.email)) errors.email = 'email field is required';

  return {
    errors,
    validation: isEmpty(errors),
  };
};

module.exports = { validateLoginInput, validateLoginAuthInput };
