const jwt = require('jsonwebtoken');

let key = process.env.JWT_KEY;
let refresh = process.env.REFRESH_TOKEN;

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const refreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: '24h',
  };

  const token = jwt.sign(payload, refresh, verifyOpts);
  return token;
};

module.exports = { generateToken, refreshToken };
