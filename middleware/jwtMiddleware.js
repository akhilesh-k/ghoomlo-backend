const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.header("x-auth-token");

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Attach the decoded user information to the request object for future use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
