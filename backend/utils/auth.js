const jwt = require("jsonwebtoken");

// Generate Access and Refresh Tokens
const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

// Verify Token
const verifyToken = (token, type) => {
  const expiration =
    type === "access"
      ? process.env.JWT_EXPIRATION
      : process.env.REFRESH_EXPIRATION;
  return jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
};

module.exports = { generateTokens, verifyToken };
