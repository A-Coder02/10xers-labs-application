const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get token from header "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to req object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
