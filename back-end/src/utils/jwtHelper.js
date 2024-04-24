const jwt =  require('jsonwebtoken');
const { config } = require ('dotenv');

config();

 const generateToken = async payload => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRATION, 10),
  });
};

 const jwtValidator = async token => {
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return false;
  }
};

module.exports = { generateToken, jwtValidator };