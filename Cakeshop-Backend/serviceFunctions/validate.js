const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
};

const validatePhone = (phone) => {
  const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return re.test(String(phone));
};

const validatePin = (pin) => {
  const re = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  return re.test(pin);
};

export default {
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validatePhone: validatePhone,
  validatePin: validatePin,
};
