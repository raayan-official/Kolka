const express = require("express");
const router = express.Router();
const User = require("./user.model");
const generateToken = require("../middleware/genetareToken");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    }

    // Create and save a new user
    const user = new User({ username, email, password });
    await user.save();

    res
      .status(201)
      .send({ message: "User Registration Has Been Successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Server error during registration" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password does not match" });
    }

    // Generate JWT token
    const token = await generateToken(user._id);

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: true, // Set to true only if using HTTPS
      sameSite: "None", // Required for cross-site cookie sharing
    });

    // Send user info as a response
    res.status(200).send({
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profilePic: user.profilePic,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Server error during login" });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged Out Successfully" });
});

//delete a user

router.delete("/users/:id", async (req, res) => {
  try {

    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });

  } catch (error) {
    console.error("Error Deleting User", error);
    res.status(500).send({ message: "Error Deleting User" });
  }
});

//get all users
router.get('/users', async (req, res) => {
  try {
    // Fetch users with specific fields and sort by creation date (descending)
    const users = await User.find({}, '_id email role').sort({ createdAt: -1 });

    res.status(200).send(users);
  } catch (error) {
    console.error("Error Fetching Users", error);

    // Send error response
    res.status(500).send({ message: "Error Fetching Users" });
  }
});

//update user role  

router.put('/users:id', async (req, res)=>{
try {
  const {id} = req.params;
  const {role} = req.body;
  const user = await User.findByIdAndUpdate(id, {role}, {new: true})
  if (!user) {
    return res.status(404).send({message: "User Not Found"});
  }res.status(200).send({message: "User Role Updated Successfully", user})
} catch (error) {
  console.error("Error Updating User role", error);
    res.status(500).send({ message: "Error Updating User role" });
}
})

//edit or update profile

router.patch('/edit-profile', async (req, res) =>{
  try {
    const {userId, username, profilePic, bio, profession} = req.body;
    if (!userId) {
      return res.status(400).send({message: "User Id Is Required"});
    }const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({message: "User Not Found"});
    }
    //update profile

    if (username !== undefined) user.username = username;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();
    res.status(200).send({message: "Updated Profile Succesfully", user:{
      _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profilePic: user.profilePic,
        bio: user.bio,
        profession: user.profession,

    }});
  } catch (error) {
    console.error("Error Updating User Profile", error);
    res.status(500).send({ message: "Error Updating User Profile" });
  }
})


module.exports = router;
