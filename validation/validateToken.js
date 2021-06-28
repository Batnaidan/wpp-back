const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const signToken = (payload, expirationTime) => {
  return jwt.sign(payload, keys.secretOrKey, {expiresIn: expirationTime} );
}

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    const [bearer, token] = bearerHeader.split(' ');
    req.token = token;
    next();
  }
};

module.exports = { signToken, verifyToken };
