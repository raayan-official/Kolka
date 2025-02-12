const jwt = require('jsonwebtoken');
const User = require('../users/user.model');  // Assuming this is your user model

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Function to generate a JWT token
const generateToken = async (userId) => {
  try {
    // Directly find user by ID (no need to fetch the full user data unless needed)
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    // Generate the JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload for the token
      JWT_SECRET, // Secret key for JWT
      { expiresIn: '1h' } // Expiry time
    );

    return token;
  } catch (error) {
    // Log the error to help with debugging
    console.error("Error generating token:", error);
    throw new Error("Could not generate token"); // You can return the error message here
  }
};

module.exports = generateToken;
