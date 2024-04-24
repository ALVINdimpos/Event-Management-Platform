const Joi = require('joi');
// Validate email
const validateEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
// Validate password
const validatePassword = password => {
  // Password must be at least 8 characters long and contain at least one capital letter and one digit
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return passwordPattern.test(password);
};
// Validate required fields
const validateFields = (req, requiredFields) => {
  const missingFields = requiredFields.filter(field => !req.body[field]);
  return missingFields;
};


module.exports = {
  validateEmail,
  validatePassword,
  validateFields,
};
