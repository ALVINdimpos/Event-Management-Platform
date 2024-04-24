
const { jwtValidator } = require('../utils/jwtHelper.js');

 const authGuard = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.authorization;
 const { id } = await jwtValidator(token);

  if (!id) {
    return res.status(401).send({
      error: true,
      message: 'Unauthorized user.',
    });
  }

  req.userId = id;

  next();
 };

module.exports = { authGuard };