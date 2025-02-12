const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs'); // Correct the import to match usage

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profilePic: String,
  bio: { type: String, maxlength: 200 },
  profession: String,
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it's being modified or is new
  if (!user.isModified('password')) return next();

  try {
    // Hash the password with bcryptjs
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;  // Replace plaintext password with hashed password
    next();  // Proceed to save
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);  // Pass the error to the next middleware or handler
  }
});

// Match password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);  // Compare the provided password with the stored hash
};

// Define and export the User model
const User = model('User', userSchema);

module.exports = User;
