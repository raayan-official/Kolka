const jwt = require('jsonwebtoken');

// Load secret key from environment variable
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer Token)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({ message: "No token provided, access denied!" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach userId and role to request object
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("Error While Verifying Token", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: "Token has expired" });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: "Invalid token" });
    }
    
    res.status(401).send({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
